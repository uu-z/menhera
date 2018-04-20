import { scanObject, $ } from "./utils";
import get from 'lodash.get'
import set from 'lodash.set'

export const $core = (_, _object) => {
  _.hooks = {};
  _.hooks._hooks = { _: [_hooks] };
  _.ObjectHooks = ObjectHooks(_);
  _.ArrayHooks = ArrayHooks(_);
  _.AnyHooks = AnyHooks(_);
  _.FunctionHooks = FunctionHooks(_);
  _.VariableHooks = VariableHooks(_);
  _.$use = _object => $use(_, _object);
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$use({ _hooks: { _mount } });
  _.$use(_object);
  return _;
};

const AnyHooks = _ => ({
  any({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  _({ object, depth, _key, _val, _object }) {
    const __ = `${depth}._`;
    const _Hooks = get(_.hooks, __, []);
    _Hooks.length > 0 && _Hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});

const ObjectHooks = _ => ({
  O({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}.O`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  $({ object, depth, _key, _val, _object }) {
    const key = `${depth}.$`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 &&
      $(_val, (key, val) => {
        hooks.forEach(h => h({ _, _key: key, _val: val, cp: _object }));
      });
  },
  O$({ object, depth, _key, _val, _object }) {
    const key = `${depth}.O$`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 &&
      $(_val, (key, val) => {
        hooks.forEach(h => h({ _, _key: key, _val: val, cp: _object }));
      });
  },
  $O({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${parentDepth}.$O`;
    const $hooks = get(_.hooks, key, []);
    $hooks.length > 0 && $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});

const ArrayHooks = _ => ({
  A({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}.A`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  A$({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}.A$`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 &&
      _val.forEach((val, i) => {
        hooks.forEach(h => h({ _, i, _val: val, cp: _object }));
      });
  },
  $A({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${parentDepth}.$A`;
    const $hooks = get(_.hooks, key, []);
    $hooks.length > 0 && $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});

const FunctionHooks = _ => ({
  F({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}.F`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  $F({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${parentDepth}.$F`;
    const $hooks = get(_.hooks, key, []);
    $hooks.length > 0 && $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});
const VariableHooks = _ => ({
  V({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${depth}.V`;
    const hooks = get(_.hooks, key, []);
    hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  },
  $V({ object, parentDepth, depth, _key, _val, _object }) {
    const key = `${parentDepth}.$V`;
    const $hooks = get(_.hooks, key, []);
    $hooks.length > 0 && $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
  }
});

export const $use = (_, _object) => {
  const onFunction = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.FunctionHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
  };
  const onArray = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.ArrayHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
  };
  const onAny = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.AnyHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
  };
  const onVariable = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.VariableHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
  };
  const onObject = ({ object, depth, parentDepth, _key, _val }) => {
    $(_.ObjectHooks, (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
    scanObject({
      object,
      depth,
      onObject,
      onVariable,
      onFunction,
      onArray,
      onAny
    });
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
    scanObject({
      object,
      depth,
      onObject,
      onVariable,
      onFunction,
      onArray: onVariable
    });
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
    scanObject({
      object,
      depth,
      onObject,
      onFunction,
      onVariable,
      onArray: onVariable
    });
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

export const _data = {
  _F({ _val, cp }) {
    let datas = _val.bind(cp)();
    $(datas, (key, val) => {
      cp[key] = val;
    });
  },
  $({ _key, _val, cp }) {
    cp[_key] = _val;
  }
};
