import { EventEmitter } from "events";
import Menhera, { _methods, _data, _config, _command } from "../src";

export const Observer = ({ observable = {} } = {}) => ({
  name: "Observer",
  _data() {
    return {
      Event: new EventEmitter(),
      observable: new Proxy(observable, {
        get: (target, key) => {
          if (key in target) {
            return target[key];
          } else {
            target[key] = null;
            return null;
          }
        },
        set: (target, key, val) => {
          target[key] = val;
          this.Event.emit(key, { val });
          return true;
        }
      })
    };
  },
  _hooks: {
    on: {
      onObserver({ _, _key, _val, cp }) {
        for (let [key, val] of Object.entries(_val())) {
          this.Event.on(key, val);
        }
      }
    }
  }
});

export const Event = {
  name: "Event",
  _data() {
    return { Event: new EventEmitter() };
  },
  _hooks: {
    on: {
      onEvent({ _, _key, _val, cp }) {
        for (let [key, val] of Object.entries(_val())) {
          this.Event.on(key, val);
        }
      }
    }
  },
  _methods: {
    emit(key, ...val) {
      this.Event.emit(key, { val });
    }
  }
};

let Test = ({ _ }) => ({
  name: "test",
  awake() {
    console.log("test0");
  },
  start() {
    const { cps: { Observer: { observable: ob }, Event: { emit } } } = _;
    ob.test1 = "test1";
    ob.test2 = "test2";
    ob.test3 = ob.test3;
    emit("test4", "test", "4");
    emit("test5", "test", "5");
  },
  on: {
    onObserver: () => ({
      test1({ val }) {
        console.log(val);
      },
      test2({ val }) {
        console.log(val);
      },
      test3({ val }) {
        console.log(val);
      }
    }),
    onEvent: () => ({
      test4({ val }) {
        console.log(val.join(""));
      },
      test5({ val }) {
        console.log(val.join(""));
      }
    })
  }
});

const _ = new Menhera({
  _hooks: {
    default: {
      _config,
      _command
    },
    _methods,
    _data
  },
  _mount: {
    1: [Observer({ observable: { test3: "test3" } }), Event],
    2: [Test]
  },
  default: {
    _config: {
      lifeCycle: ["awake", "start"]
    },
    _command: {
      start: true
    }
  }
});
