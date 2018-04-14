import { EventEmitter } from "events";
import Menhera from "../src";
import { _methods, _data, _config, _command } from "./plugins";

export const Event = {
  name: "Event",
  _data: {
    Event: new EventEmitter()
  },
  _hooks: {
    on: {
      Event: {
        $({ _, _key, _val, cp }) {
          this.Event.on(_key, _val);
        }
      }
    },
    emit: {
      Event: {
        $({ _, _key, _val }) {
          this.Event.emit(_key, { val: _val });
        }
      }
    }
  }
};

let Test = {
  name: "test",
  awake() {
    console.log("test0");
  },
  start({ _ }) {
    _.$use({
      emit: {
        Event: {
          test1: "test1",
          test2: "test2"
        }
      }
    });
  },
  on: {
    Event: {
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
    _config,
    _data
  },
  _mount: {
    Event,
    Test
  },
  _config: {
    lifeCycle: ["awake", "start"],
    run: true
  }
});
