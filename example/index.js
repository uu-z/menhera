import { EventEmitter } from "events";
import Menhera from "../src";

export const Observer = ({ observable = {} } = {}) => ({ _ }) => ({
  name: "Observer",
  Event: new EventEmitter(),
  observable,
  _awake() {
    let _this = this;
    this.observable = new Proxy(observable, {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else {
          target[key] = null;
          return null;
        }
      },
      set(target, key, val) {
        target[key] = val;
        _this.Event.emit(key, { val });
        return true;
      }
    });
  },
  _hooks: {
    onObserver({ name: _name, event, cp }) {
      this.Event.on(_name, event);
    }
  }
});

export const Event = ({ _ }) => ({
  name: "Event",
  Event: new EventEmitter(),
  _hooks: {
    onEvent({ name: _name, event }) {
      this.Event.on(_name, event);
    }
  },
  _methods: {
    emit(_name, ...val) {
      this.Event.emit(_name, { val });
    }
  }
});

let Test = ({ _ }) => ({
  name: "test",
  _awake() {
    console.log("test0");
  },
  start() {
    const {
      components: { Observer: { observable: ob } },
      methods: { emit }
    } = _;
    ob.test1 = "test1";
    ob.test2 = "test2";
    ob.test3 = ob.test3;
    emit("test4", "test", "4");
    emit("test5", "test", "5");
  },
  onObserver: {
    test1({ val }) {
      console.log(val);
    },
    test2({ val }) {
      console.log(val);
    },
    test3({ val }) {
      console.log(val);
    }
  },
  onEvent: {
    test4({ val }) {
      console.log(val.join(""));
    },
    test5({ val }) {
      console.log(val.join(""));
    }
  }
});

const _ = new Menhera({
  lifeCycle: ["_awake", "start"],
  components: [Observer({ observable: { test3: "test3" } }), Event, Test]
}).init();
