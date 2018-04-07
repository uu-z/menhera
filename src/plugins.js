import { ConfigMerger, scanObject, getRootHookDepth } from "./utils";
import { set, get } from "lodash";

export const $use = ({ _ }) => parms => {
  const onVariable = ({ object, depth, _key, _val }) => {
    const hooks = get(_.hooks, depth, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: parms }));
  };
  const onObject = ({ object, depth, _key, _val }) => {
    let rootHookDepth = getRootHookDepth(depth);
    const hooks = get(_.hooks, rootHookDepth, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: parms }));

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
  const onObject = ({ object, depth, _key, _val }) => {
    scanObject({ object, depth, onObject, onFunction });
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

export const _config = {
  _({ _, _key, _val, cp }) {
    _.config = ConfigMerger(_.config, _val);
  }
};

export const _command = {
  _({ _, _key, _val, cp }) {
    const { start } = _val;
    if (start) {
      const { lifeCycle = [] } = _.config;
      Object.values(_.cps).forEach(async cp => {
        await lifeCycle.forEach(key => {
          cp[key] && cp[key]();
        });
      });
    }
  }
};

export const _methods = {
  _({ _, _key, _val, cp }) {
    for (let [key, val] of Object.entries(_val)) {
      if (!cp[key]) {
        cp[key] = val.bind(cp);
      } else {
        console.warn(
          `${cp.name} : "${key}"  in methods is valid, Please use another one`
        );
      }
    }
  }
};

export const _data = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val.bind(cp)())) {
    if (!cp[key]) {
      if (typeof val === "function") {
        cp[key] = val.bind(cp);
      } else {
        cp[key] = val;
      }
    } else {
      console.warn(
        `${cp.name} : "${key} " is data is valid, Please use another one`
      );
    }
  }
};
