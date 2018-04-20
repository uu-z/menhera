import { initHooks, $get, $set, $use, _hooks, _mount } from "./utils";

export * from "./utils";

export const $core = (_, _object) => {
  _.hooks = initHooks(_);
  _.hooks._hooks = { _: [_hooks] };
  _.$use = _object => $use(_, _object);
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$use({ _hooks: { _mount } });
  _.$use(_object);
  return _;
};

export default _object => $core({}, _object);
