import { scanObject, getEachHookDepth, getRootHookDepth } from "./utils";
import { set, get } from "lodash";

export const $use = ({ _ }) => parms => {
  const onVariable = ({ object, depth, _key, _val }) => {
    const hooks = get(_.hooks, depth, []);

    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: parms }));
  };
  const onObject = ({ object, depth, _key, _val }) => {
    let rootHookDepth = getRootHookDepth(depth);
    let eachHookDepth = getEachHookDepth(depth);
    const rootHooks = get(_.hooks, rootHookDepth, []);
    const eachHooks = get(_.hooks, eachHookDepth, []);
    rootHooks.length > 0 &&
      rootHooks.forEach(h => h({ _, _key, _val, cp: parms }));
    if (`${depth}._`.length > 0 && _val) {
      for (let [key, val] of Object.entries(_val)) {
        eachHooks.forEach(h => h({ _, _key: key, _val: val, cp: parms }));
      }
    }

    scanObject({ object, depth, onObject, onVariable, onFunction: onVariable });
  };

  if (typeof parms === "object") {
    onObject({ object: parms, depth: "" });
  }
  return _;
};

export const _hooks = ({ _, _key, _val, cp }) => {
  const onFunction = ({ depth, _val }) => {
    let target = get(_.hooks, depth, []);
    if (!target.includes(_val.bind(cp))) {
      target.push(_val.bind(cp));
      set(_.hooks, depth, target);
    }
  };
  const onVariable = ({ depth, _val }) => {
    if (Array.isArray(_val)) {
      _val.forEach(val => {
        if (typeof val === "function") {
          onFunction({ depth, _val: val });
        }
      });
    }
  };
  const onObject = ({ object, depth, _key, _val }) => {
    scanObject({ object, depth, onObject, onFunction, onVariable });
  };
  if (typeof _val === "object") {
    onObject({ object: _val, depth: "" });
  }
};

export const _mount = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val)) {
    val.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      _.cps[name] = cp;
      _.$use(_.cps[name]);
    });
  }
};
