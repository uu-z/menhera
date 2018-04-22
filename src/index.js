import { initHooks, $get, $set, $use, $merge } from "./utils";
import { EventEmitter } from "events";

export * from "./utils";

export const $core = (_, _object) => {
  _.hooks = initHooks(_);
  _.events = new EventEmitter();
  _.events.on("$use", _object => $use(_, _object));
  _.$use = _object => _.events.emit("$use", _object);
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$merge = _array => $merge(_array);
  _.$use(_object);
  return _;
};

export default _object => $core({}, _object);
