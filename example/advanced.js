import { EventEmitter } from "events";
import Menhera, { _methods, _data } from "menhera";

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
  _hooks: () => ({
    onObserver({ _key, _val, cp }) {
      for (let [key, val] of Object.entries(_val)) {
        this.Event.on(key, val);
      }
    }
  })
});

export const Event = {
  name: "Event",
  _data() {
    return {
      Event: new EventEmitter()
    };
  },
  _hooks: () => ({
    onEvent({ _key, _val }) {
      for (let [key, val] of Object.entries(_val)) {
        this.Event.on(key, val);
      }
    }
  }),
  _methods: {
    emit(key, ...val) {
      this.Event.emit(key, { val });
    }
  }
};

let Test = ({ _ }) => ({
  name: "test",
  _awake() {
    console.log("test0");
  },
  awake() {
    const { components: { Observer: { observable: ob }, Event: { emit } } } = _;
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
  _config: {
    lifeCycle: ["_awake", "awake"]
  },
  _hooks: () => ({
    _methods,
    _data
  }),
  _mount: {
    1: [Observer({ observable: { test3: "test3" } }), Event],
    2: [Test]
  }
}).$use({
  _command: {
    run: true
  }
});
