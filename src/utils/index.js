export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
};

export const scanObject = async ({
  object,
  depth = null,
  onObject,
  onFunction,
  onVariable,
  onAll
}) => {
  if (object) {
    $(object, (_key, _val) => {
      let parentDepth = depth;
      const newDepth = depth ? depth + `.${_key}` : _key;
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
        } else if (typeof _val === "object" && !Array.isArray(_val)) {
          onObject &&
            onObject({
              object: object[_key],
              depth: newDepth,
              parentDepth,
              _key,
              _val
            });
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
      onAll && onAll({ object, depth, _key, _val });
    });
  } else {
    console.warn(`scanObject: object must be valid`);
  }
};
