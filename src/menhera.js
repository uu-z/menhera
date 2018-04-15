import { _hooks, _mount, $use, $get, $set } from "./plugins";

export const core = ({ _, _object }) => {
  _.hooks = {};
  _.hooks._hooks = { _: [_hooks] };
  _.hooks._mount = { $: [_mount] };
  _.$use = _object => $use({ _, _object });
  _.$get = _object => $get({ _, _object });
  _.$set = _object => $set({ _, _object });
  _.$use(_object);
  return _;
};
