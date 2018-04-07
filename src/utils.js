export const scanObject = ({
  object,
  depth = null,
  onObject = () => {},
  onFunction = () => {},
  onVariable = () => {}
}) => {
  if (object) {
    for (let [_key, _val] of Object.entries(object)) {
      if (_val) {
        const newDepth = depth ? depth + `.${_key}` : _key;
        if (typeof _val === "function") {
          onFunction({
            object,
            depth: newDepth,
            _key,
            _val
          });
        } else if (typeof _val === "object" && !Array.isArray(_val)) {
          onObject({
            object: object[_key],
            depth: newDepth,
            _key,
            _val
          });
        } else {
          onVariable({
            object,
            depth: newDepth,
            _key,
            _val
          });
        }
      }
    }
  } else {
    console.warn(`scanObject: object must be valid`);
  }
};
