export * from "./scan";
export * from "./hooks";

import get from "lodash.get";
import set from "lodash.set";
import has from "lodash.has";
export { get, set, has };

export const HOOKS = Symbol("hooks");
export const EVENTS = Symbol("events");

export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
};
export const scanObject = ({
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
        if (onFunction && typeof _val === "function") {
          onFunction({
            hook: "onFunction",
            object,
            depth: newDepth,
            parentDepth,
            _key,
            _val
          });
        } else if ((onArray || onObject) && typeof _val === "object") {
          if (Array.isArray(_val)) {
            onArray({
              hook: "onArray",
              object: object,
              depth: newDepth,
              parentDepth,
              _key,
              _val
            });
          } else {
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
