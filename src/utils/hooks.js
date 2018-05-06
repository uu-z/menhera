import { scanObject, $, HOOKS, get, set, uuid } from "../utils";

export const initHooks = () => {
  let cache = {};
  cache._hooks = { _: { [uuid.v1()]: _hooks._ } };
  cache._mount = { $: { [uuid.v1()]: _mount.$ } };
  return cache;
};

export const _hooks = {
  _({ _, _val, cp }) {
    const { uuid } = cp;
    if (typeof _val === "object") {
      const onFunction = ({ depth, _val }) => {
        let target = get(_[HOOKS], depth, {});
        target[uuid] = _val.bind(cp);
        set(_[HOOKS], depth, target);
      };
      const onObject = ({ object, depth, _key, _val }) => {
        scanObject({ object, depth, onObject, onFunction });
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
