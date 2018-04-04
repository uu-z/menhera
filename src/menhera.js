import { bindHook, ConfigMerger } from "./utils";
import { _hooks, _hook, _mount, _config, _command } from "./plugins";

const initConfig = {
  lifeCycle: ["_awake", "awake"]
};

export const core = ({ _, parms }) => {
  _.components = {};
  _.hooks = {};
  _.config = initConfig;
  _.hooks._hooks = [_hooks];
  _.hooks._mount = [_mount];

  _.$use = parms => {
    Object.keys(parms).forEach(_key => {
      bindHook({ _, _key, cp: parms });
    });
  };

  _.$use({
    _hooks: () => ({
      _config,
      _command
    })
  });

  _.$use(parms);
  return _;
};
