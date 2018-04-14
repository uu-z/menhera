import { EventEmitter } from "events";

export const HOOK = "Event";
export default {
  name: HOOK,
  Event: new EventEmitter(),
  _hooks: {
    [HOOK]: {
      on: {
        $({ _, _key, _val, cp }) {
          this.Event.on(_key, _val);
        }
      },
      emit: {
        $({ _, _key, _val }) {
          this.Event.emit(_key, { val: _val });
        }
      }
    }
  }
};
