import { _hooks, _mount, $use } from "./plugins";

export const core = ({ _, parms }) => {
  _.cps = {};
  _.hooks = {};
  _.hooks._hooks = [_hooks];
  _.hooks._mount = [_mount];
  _.$use = $use({ _ });
  _.$use(parms);
  return _;
};
