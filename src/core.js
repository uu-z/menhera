import { scanObject, $ } from "./utils";
import { set, get } from "lodash";

export const $core = (_, _object) => {
  _.hooks = {};
  _.hooks._hooks = { _: [_hooks] };
  _.objectHooks = objectHooks(_);
  _.$use = _object => $use(_, _object);
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$use({ _hooks: { _mount } });
  _.$use(_object);
  return _;
};

export const $use = (_, _object) => {
  const onFunction = ({ object, depth, parentDepth, _key, _val }) => {
    const hooks = get(_.hooks, depth, []);
    const $F = `${parentDepth}.$F`;
    const $FHooks = get(_.hooks, $F, []);

    $FHooks.length > 0 &&
      $FHooks.forEach(h => h({ _, _key, _val, cp: _object }));

    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  };
  const onVariable = ({ object, depth, parentDepth, _key, _val }) => {
    const hooks = get(_.hooks, depth, []);
    const $V = `${parentDepth}.$V`;
    const $VHooks = get(_.hooks, $V, []);

    $VHooks.length > 0 &&
      $VHooks.forEach(h => h({ _, _key, _val, cp: _object }));

    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  };
  const onObject = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.objectHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });

    scanObject({ object, depth, onObject, onVariable, onFunction });
  };
  if (typeof _object === "object") {
    onObject({ object: _object, depth: "" });
  }
  return _;
};

export const $set = (_, _object) => {
  let cache = {};
  const onVariable = ({ object, depth, _key, _val }) => {
    set(_, depth, _val);
    set(cache, depth, _val);
  };
  const onFunction = ({ object, depth, _key, _val }) => {
    let tar = get(_, depth);
    let result = _val({ tar });
    set(_, depth, result);
    set(cache, depth, result);
  };

  const onObject = ({ object, depth, _key, _val }) => {
    scanObject({ object, depth, onObject, onVariable, onFunction });
  };
  if (typeof _object === "object") {
    onObject({ object: _object, depth: "" });
  }
  return cache;
};

export const $get = (_, _object) => {
  let cache = {};
  const onVariable = ({ object, depth, _key, _val }) => {
    let result = get(_, depth);
    result && set(cache, depth, result);
    !result && set(cache, depth, _val);
  };

  const onFunction = ({ object, depth, _key, _val }) => {
    let tar = get(_, depth);
    let result = _val({ tar });
    result && set(cache, depth, result);
    !result && set(cache, depth, _val);
  };

  const onObject = ({ object, depth, _key, _val }) => {
    scanObject({ object, depth, onObject, onFunction, onVariable });
  };

  if (typeof _object === "object") {
    onObject({ object: _object, depth: "" });
  }
  return cache;
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

export const _mount = {
  $({ _, _val, cp }) {
    let cps = Array.isArray(_val) ? _val : [_val];
    cps.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      _.$use(cp);
      const { name } = cp;
      if (_[name]) {
        throw new Error(`_mount: name "${name}" exists, please another one`);
      }
      _[name] = cp;
    });
  }
};

const objectHooks = _ => ({
  _({ object, depth, _key, _val, _object }) {
    let rootHookDepth = `${depth}._`;
    const rootHooks = get(_.hooks, rootHookDepth, []);
    rootHooks.length > 0 &&
      rootHooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  $({ object, depth, _key, _val, _object }) {
    let eachHookDepth = `${depth}.$`;
    const eachHooks = get(_.hooks, eachHookDepth, []);
    eachHooks.length > 0 &&
      $(_val, (key, val) => {
        eachHooks.forEach(h => h({ _, _key: key, _val: val, cp: _object }));
      });
  },
  $O({ object, parentDepth, depth, _key, _val, _object }) {
    let rootHookDepth = `${parentDepth}.$O`;
    const rootHooks = get(_.hooks, rootHookDepth, []);
    rootHooks.length > 0 &&
      rootHooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});
