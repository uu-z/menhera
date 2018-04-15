import { _hooks, _mount, $use, $get, $set } from "./plugins";

export const core = ({ _, _object }) => {
  _.hooks = {};
  _.hooks._hooks = { _: [_hooks] };
  _.hooks._mount = { $: [_mount] };
  _.$use = $use({ _ });
  _.$get = $get({ _ });
  _.$set = $set({ _ });
  _.$use(_object);
  return _;
};
