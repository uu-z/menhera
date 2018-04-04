import { _hooks, _mount, _config, _command, $use } from "./plugins";

const initConfig = {
  lifeCycle: ["_awake", "awake"]
};

export const core = ({ _, parms }) => {
  _.components = {};
  _.hooks = {};
  _.config = initConfig;
  _.hooks._hooks = [_hooks];
  _.hooks._mount = [_mount];
  _.$use = $use({ _ });
  _.$use({
    _hooks: () => ({
      _config,
      _command
    })
  });
  _.$use(parms);
  return _;
};
