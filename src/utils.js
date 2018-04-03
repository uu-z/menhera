export const bindHook = ({ _, hook, p, cp }) => {
  if (typeof hook === "function") {
    if (typeof cp[p] === "object") {
      for (const [key, value] of Object.entries(cp[p])) {
        if (typeof value === "function") {
          hook({ key, value: value.bind(cp), cp, p });
        } else {
          hook({ key, value, cp, p });
        }
      }
    } else if (typeof cp[p] === "function") {
      hook({ p: cp[p].bind(cp), cp });
    } else {
      hook({ cp, p });
    }
  }
};

export const ConfigMerger = (
  initConfig,
  { components, lifeCycle, ...other }
) => {
  return {
    components: [...initConfig.components, ...components],
    lifeCycle: lifeCycle ? lifeCycle : initConfig.lifeCycle,
    ...other
  };
};
