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
