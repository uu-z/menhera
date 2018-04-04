export const bindHook = ({ hook, _, _key, cp }) => {
  if (typeof hook === "function") {
    const _val = cp[_key];

    if (typeof cp[_key] === "object") {
      for (const [key, val] of Object.entries(cp[_key])) {
        if (typeof val === "function") {
          hook({ key, val: val.bind(cp), cp, _key, _val });
        } else {
          hook({ key, val, cp, _key, _val });
        }
      }
    } else if (typeof cp[_key] === "function") {
      hook({ _key, _val: cp[_key].bind(cp), cp });
    } else {
      hook({ _key, _val, cp });
    }
  }
};

export const ConfigMerger = (
  initConfig,
  { $mount = {}, lifeCycle, ...other }
) => {
  return {
    lifeCycle: lifeCycle ? lifeCycle : initConfig.lifeCycle,
    $mount: { ...initConfig.$mount, ...$mount },
    ...other
  };
};
