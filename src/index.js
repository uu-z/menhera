import { initHooks, HOOKS, $use, $unuse } from "./utils";
import { EventEmitter } from "events";

export * from "./utils";

export const $core = (_, _object) => {
  _[HOOKS] = initHooks(_);
  _._events = new EventEmitter();
  _._events.on("$use", _object => $use(_, _object));
  _.$use = _object => {
    _._events.emit("$use", _object);
    return _;
  };
  _._events.on("$unuse", _object => $unuse(_, _object));
  _.$unuse = _object => {
    _._events.emit("$unuse", _object);
    return _;
  };
  _.$use(_object);
  return _;
};

export default $core(_object => $core({}, _object), {});
