import { EventEmitter } from "events";

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
