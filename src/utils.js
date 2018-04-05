export const bindHook = ({ _, _key, cp }) => {
  const hook = _.hooks[_key];
  const _val = cp[_key];
  if (Array.isArray(hook)) {
    hook.forEach(h => {
      if (typeof h === "function") {
        h({ _, _key, _val, cp });
      }
    });
  } else {
    if (typeof hook === "function") {
      hook({ _, _key, _val, cp });
    }
  }
};

const initConfig = { lifeCycle: ["awake", "start"] };
export const ConfigMerger = (
  initConfig = initConfig,
  { lifeCycle, ...other }
) => {
  return { lifeCycle: lifeCycle ? lifeCycle : initConfig.lifeCycle, ...other };
};
