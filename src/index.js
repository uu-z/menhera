import {
  initHooks,
  $get,
  $set,
  $use,
  $merge,
  $diff,
  $has,
  $match,
  _hooks,
  HOOKS
} from "./utils";
import { EventEmitter } from "events";

export * from "./utils";

export const $minCore = (_, _object) => {
  _[HOOKS] = { _: [_hooks._] };
  _.$use = (_, _object) => $use(_, _object);
  _.$use(_object);
  return _;
};

export const $core = (_, _object) => {
  _[HOOKS] = initHooks(_);
  _.events = new EventEmitter();
  _.events.on("$use", _object => $use(_, _object));
  _.$use = _object => {
    _.events.emit("$use", _object);
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
