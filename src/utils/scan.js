import { $, scanObject, HOOKS } from "../utils";
import { useHooks } from "./scanHooks";
import get from "lodash.get";
import set from "lodash.set";
import has from "lodash.has";

let mathchPath = /\./;
export const $use = (_, _object) => {
  const hooks = useHooks(_);
  const BindHook = ({ hook, object, depth, parentDepth, _key, _val }) => {
    if (mathchPath.test(_key)) {
      depth = `${parentDepth}${_key}`;
    }
    const validHook = has(_[HOOKS], depth);
    if (depth != "" && !validHook) return;

    const _hooks = hooks[hook];
    _hooks &&
      $(_hooks, (key, hook) => {
        hook({ hook, object, parentDepth, depth, _key, _val, _object });
      });
  };

  const onObject = data => {
    const { object, hook, depth } = data;
    const validHook = has(_[HOOKS], depth);
    if (depth != "" && !validHook) return;
    hook && BindHook(data);

    scanObject({
      object,
      depth,
      onObject,
      onVariable: BindHook,
      onFunction: BindHook,
      onArray: BindHook,
      onAny: BindHook
    });
  };
  if (Array.isArray(_object)) {
    $(_object, (key, object) => {
      onObject({ object, depth: "" });
    });
    return _;
  }

  typeof _object === "object" && onObject({ object: _object, depth: "" });
  return _;
};

export const $set = (_, _object) => {
  if (Array.isArray(_object)) {
    let cache = $merge(_object);
    _set(_, cache);
    return cache;
  }

  if (typeof _object === "object") {
    return _set(_, _object);
  }
};

export const _set = (_, _object) => {
  let cache = {};
  const onVariable = ({ object, depth, _key, _val }) => {
    set(_, depth, _val);
    set(cache, depth, _val);
    return;
  };
  const onFunction = ({ object, depth, _key, _val }) => {
    let tar = get(_, depth);
    let result = _val({ tar });
    set(_, depth, result);
    set(cache, depth, result);
    return;
  };

  const onObject = ({ object, depth, _key, _val }) => {
    if (Object.keys(object).length === 0) {
      set(_, depth, _val);
      set(cache, depth, _val);
      return;
    }
    scanObject({
      object,
      depth,
      onObject,
      onVariable,
      onFunction,
      onArray: onVariable
    });
  };
  onObject({ object: _object, depth: "" });

  return cache;
};

export const $merge = _array => {
  let cache = {};
  $(_array, (key, val) => {
    _set(cache, val);
  });
  return cache;
};

export const $get = (_, _object) => {
  if (Array.isArray(_object)) {
    let cache = [];
    $(_object, (key, val) => {
      cache[key] = _get(_, val);
    });
    return cache;
  }

  if (typeof _object === "object") {
    return _get(_, _object);
  }
};

export const _get = (_, _object) => {
  let cache = {};
  const onVariable = ({ object, depth, _key, _val }) => {
    let result = get(_, depth);
    result && set(cache, depth, result);
    !result && set(cache, depth, _val);
    return;
  };

  const onFunction = ({ object, depth, _key, _val }) => {
    let tar = get(_, depth);
    let result = _val({ tar });
    result && set(cache, depth, result);
    !result && set(cache, depth, _val);
    return;
  };

  const onObject = ({ object, depth, _key, _val }) => {
    if (Object.keys(object).length === 0) {
      let result = get(_, depth);
      result && set(cache, depth, result);
      !result && set(cache, depth, _val);
      return;
    }

    scanObject({
      object,
      depth,
      onObject,
      onFunction,
      onVariable,
      onArray: onVariable
    });
  };
  onObject({ object: _object, depth: "" });

  return cache;
};

export const $diff = (_, _object) => {
  if (Array.isArray(_object)) {
    let cache = [];
    $(_object, (key, val) => {
      cache[key] = _diff(_, val);
    });
    return cache;
  }

  if (typeof _object === "object") {
    return _diff(_, _object);
  }
};

export const _diff = (_, _object) => {
  let cache = {};
  const onObject = ({ object, depth, _key, _val }) => {
    let target = get(_, depth, {});
    $(object, (key, val) => {
      if (typeof val === "object") {
        return;
      }
      let result = target[key];
      if (result !== val) {
        const newDepth = `${depth}.${key}`;
        set(cache, newDepth, val);
      }
      return;
    });

    scanObject({
      object,
      depth,
      onObject
    });
  };
  onObject({ object: _object, depth: "" });

  return cache;
};

export const _has = (_, _object) => {
  let cache = {};
  const onObject = ({ object, depth, _key, _val }) => {
    let target = get(_, depth);
    $(object, (key, val) => {
      if (typeof val === "object") {
        return;
      }
      const newDepth = `${depth}.${key}`;
      let result = target[key];

      result && set(cache, newDepth, true);
      !result && set(cache, newDepth, false);

      return;
    });

    scanObject({
      object,
      depth,
      onObject
    });
  };
  onObject({ object: _object, depth: "" });

  return cache;
};

export const $has = (_, _object) => {
  if (Array.isArray(_object)) {
    let cache = [];
    $(_object, (key, val) => {
      cache[key] = _has(_, val);
    });
    return cache;
  }

  if (typeof _object === "object") {
    return _has(_, _object);
  }
};
