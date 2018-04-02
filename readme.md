# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import { EventEmitter } from "events";
import Menhera from "menhera";

export const Observer = _ => ({
  name: "menhera-observer",
  awake() {
    const { config: { observable = {} } } = _;
    _.Observer = { Event: new EventEmitter() };
    _.config.observable = new Proxy(observable, {
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
        _.Observer.Event.emit(key, { val });
        return true;
      }
    });
    _.onObserver = ({ name, event }) => {
      _.Observer.Event.on(name, event);
    };
  },
  onObserver: {
    foo() {
      console.log("bar");
    }
  }
});

export const Event = _ => ({
  name: "menhera-event",
  awake() {
    _.Event = new EventEmitter();
    _.onEvent = ({ name, event }) => {
      _.Event.on(name, event);
    };

    _.emit = (name, ...val) => {
      _.Event.emit(name, { val });
    };
  },
  onEvent: {
    foo() {
      console.log("bar");
    }
  }
});

let Test = _ => ({
  name: "test",
  awake() {
    console.log("test0");
  },
  start() {
    const { config: { observable: ob } } = _;
    ob.test1 = "test1";
    ob.test2 = "test2";
    ob.test3 = ob.test3;
    _.emit("test4", "test", "4");
    _.emit("test5", "test", "5");
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
  components: [Observer, Event, Test],
  observable: { test3: "test3" }
}).init();
```
