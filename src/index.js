import {
  initHooks,
  $get,
  $set,
  $use,
  $merge,
  $diff,
  $has,
  $match,
  HOOKS,
  EVENTS
} from "./utils";
import { EventEmitter } from "events";

export * from "./utils";

export const $core = (_, _object) => {
  _[HOOKS] = initHooks(_);
  _[EVENTS] = new EventEmitter();
  _[EVENTS].on("$use", _object => $use(_, _object));
  _.$use = _object => {
    _[EVENTS].emit("$use", _object);
    return _;
  };
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$diff = _object => $diff(_, _object);
  _.$has = _object => $has(_, _object);
  _.$match = _object => $match(_, _object);
  _.$merge = _array => $merge(_array);
  _.$use(_object);
  return _;
};

export default $core({}, {});
