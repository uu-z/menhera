export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
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
      onAny && onAny({ object, depth: newDepth, parentDepth, _key, _val });
      if (_val) {
        if (typeof _val === "function") {
          onFunction &&
            onFunction({
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
                object: object,
                depth: newDepth,
                parentDepth,
                _key,
                _val
              });
          } else {
            onObject &&
              onObject({
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
