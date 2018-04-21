import { $, scanObject } from "../utils";
import { useHooks } from "./scanHooks";
import get from "lodash.get";
import set from "lodash.set";
import has from "lodash.has";

export const $use = (_, _object) => {
  const hooks = useHooks(_);
  const BindHook = ({ hook, object, depth, parentDepth, _key, _val }) => {
    const validHook = has(_.hooks, depth);
    if (depth != "" && !validHook) return;

    const _hooks = hooks[hook];
    _hooks &&
      $(_hooks, (key, hook) => {
        hook({ hook, object, parentDepth, depth, _key, _val, _object });
      });
  };

  const onObject = data => {
    const { object, hook, depth } = data;
    const validHook = has(_.hooks, depth);
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
  typeof _object === "object" && onObject({ object: _object, depth: "" });
  Array.isArray(_object) &&
    $(_object, (key, object) => onObject({ object, depth: "" }));

  return _;
};

export const $set = (_, _object) => {
  if (typeof _object === "object") {
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
  }
};

export const $get = (_, _object) => {
  if (typeof _object === "object") {
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
  }
};
