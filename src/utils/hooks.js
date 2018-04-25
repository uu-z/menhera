import get from "lodash.get";
import set from "lodash.set";
import { scanObject, $ } from "../utils";

export const initHooks = _ => {
  let cache = {};
  cache._hooks = { _: [_hooks._] };
  cache._mount = { $: [_mount.$] };
  return cache;
};

export const _hooks = {
  _({ _, _val, cp }) {
    if (typeof _val === "object") {
      const onFunction = ({ depth, _val }) => {
        let target = get(_.hooks, depth, []);
        if (!target.includes(_val.bind(cp))) {
          target.push(_val.bind(cp));
          set(_.hooks, depth, target);
        }
      };
      const onVariable = ({ depth, _val }) => {
        if (Array.isArray(_val)) {
          $(_val, (key, val) => {
            if (typeof val === "function") {
              onFunction({ depth, _val: val });
            }
          });
        }
      };
      const onObject = ({ object, depth, _key, _val }) => {
        scanObject({ object, depth, onObject, onFunction, onVariable });
      };
      onObject({ object: _val, depth: "" });
    }
  }
};

export const _mount = {
  $({ _, _val, cp }) {
    let cps = Array.isArray(_val) ? _val : [_val];
    $(cps, (key, component) => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      if (_[name]) {
        console.log(`_mount: name "${name}" exists`);
        return;
      }
      _.$use(cp);
      _[name] = cp;
    });
  }
};
