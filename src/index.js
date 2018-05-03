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

export const $core = (_, _object) => {
  _[HOOKS] = initHooks(_);
  _.events = new EventEmitter();
  _.events.on("$use", _object => $use(_, _object));
  _.$use = _object => {
    _.events.emit("$use", _object);
    return _;
  };
  _.$use(_object);
  return _;
};

export default $core({}, {});
