const initConfig = { lifeCycle: ["awake", "start"] };
export const ConfigMerger = (
  currentConfig = initConfig,
  { lifeCycle, ...other }
) => {
  return {
    lifeCycle: lifeCycle ? lifeCycle : currentConfig.lifeCycle,
    ...other
  };
};

export const scanObject = ({
  object,
  depth = null,
  isObject = () => {},
  isFunction = () => {},
  isVariable = () => {}
}) => {
  if (object) {
    for (let [_key, _val] of Object.entries(object)) {
      if (_val) {
        const newDepth = depth ? depth + `.${_key}` : _key;
        if (typeof _val === "function") {
          isFunction({
            object,
            depth: newDepth,
            _key,
            _val
          });
        } else if (typeof _val === "object" && !Array.isArray(_val)) {
          isObject({
            object: object[_key],
            depth: newDepth,
            _key,
            _val
          });
        } else {
          isVariable({
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

export const getRootHookDepth = depth => `${depth}._`;
