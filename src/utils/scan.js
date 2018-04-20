import { $, scanObject } from "../utils";
import get from "lodash.get";
import set from "lodash.set";

export const $use = _ => _object => {
  const hooks = _.hooks["$use"];
  const BindHook = ({ hook, object, depth, parentDepth, _key, _val }) => {
    $(hooks[hook], (key, hook) => {
      hook({ object, parentDepth, depth, _key, _val, _object });
    });
  };

  const onObject = data => {
    const { object, hook, depth } = data;
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
  onObject({ object: _object, depth: "" });
};

export const $set = _ => _object => {
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
  onObject({ object: _object, depth: "" });
  return cache;
};

export const $get = _ => _object => {
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
  onObject({ object: _object, depth: "" });

  return cache;
};

export const _hook = _ => (_object, cp) => {
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
  onObject({ object: _object, depth: "" });
};
