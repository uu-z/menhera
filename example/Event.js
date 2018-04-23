import { EventEmitter } from "events";
import Menhera from "../dist";
import { _methods, _lifeCycle } from "./plugins";

export const Event = {
  name: "Event",
  Event: new EventEmitter(),
  _hooks: {
    Event: {
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

let Test = {
  name: "Test",
  awake() {
    console.log("test0");
  },
  start({ _ }) {
    _.$use({ Event: { emit: { test1: "test1", test2: "test2" } } });
  },
  Event: {
    on: {
      test1({ val }) {
        console.log(val);
      },
      test2({ val }) {
        console.log(val);
      }
    }
  }
};

const _ = new Menhera({
  _hooks: {
    _lifeCycle
  },
  _mount: {
    Event,
    Test
  },
  _lifeCycle: {
    lifeCycle: ["awake", "start"],
    run: true
  }
});
