import * as scanHooks from "./scanHooks";

export * from "./scan";
export * from "./hooks";

export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
};
export const initHooks = _ => {
  let cache = {};
  $(scanHooks, (key, val) => {
    cache[key] = val(_);
  });
  return cache;
};

export const scanObject = async ({
  object,
  depth = null,
  onObject,
  onArray,
  onFunction,
  onVariable,
  onAny
}) => {
  if (object) {
    $(object, (_key, _val) => {
      let parentDepth = depth;
      const newDepth = depth ? depth + `.${_key}` : _key;
      onAny &&
        onAny({
          hook: "onAny",
          object,
          depth: newDepth,
          parentDepth,
          _key,
          _val
        });
      if (_val) {
        if (typeof _val === "function") {
          onFunction &&
            onFunction({
              hook: "onFunction",
              object,
              depth: newDepth,
              parentDepth,
              _key,
              _val
            });
        } else if (typeof _val === "object") {
          if (Array.isArray(_val)) {
            onArray &&
              onArray({
                hook: "onArray",
                object: object,
                depth: newDepth,
                parentDepth,
                _key,
                _val
              });
          } else {
            onObject &&
              onObject({
                hook: "onObject",
                object: object[_key],
                depth: newDepth,
                parentDepth,
                _key,
                _val
              });
          }
        } else {
          onVariable &&
            onVariable({
              hook: "onVariable",
              object,
              depth: newDepth,
              parentDepth,
              _key,
              _val
            });
        }
      } else {
        onVariable &&
          onVariable({
            hook: "onVariable",
            object,
            depth: newDepth,
            parentDepth,
            _key,
            _val
          });
      }
    });
  } else {
    console.warn(`scanObject: object must be valid`);
  }
};
