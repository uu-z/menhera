export const $ = (obj, cb) => {
  for (let [key, val] of Object.entries(obj)) {
    cb(key, val);
  }
};
export const $O = (obj, cb) => {
  $(obj, (key, val) => {
    if (typeof val === "object") {
      cb(key, val);
    }
  });
};

export const $F = (obj, cb) => {
  $(obj, (key, val) => {
    if (typeof val === "function") {
      cb(key, val);
    }
  });
};

export const $V = (obj, cb) => {
  $(obj, (key, val) => {
    let type = typeof val;
    if (type !== "function" && type !== "object") {
      cb(key, val);
    }
  });
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
      const newDepth = depth ? depth + `.${_key}` : _key;
      if (_val) {
        if (typeof _val === "function") {
          onFunction &&
            onFunction({
              object,
              depth: newDepth,
              _key,
              _val
            });
        } else if (typeof _val === "object" && !Array.isArray(_val)) {
          onObject &&
            onObject({
              object: object[_key],
              depth: newDepth,
              _key,
              _val
            });
        } else {
          onVariable &&
            onVariable({
              object,
              depth: newDepth,
              _key,
              _val
            });
        }
      } else {
        onVariable &&
          onVariable({
            object,
            depth: newDepth,
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
