import { EventEmitter } from "events";

export const Observer = _ => ({
  name: "menhera-observer",
  awake() {
    _.Observer = { Event: new EventEmitter() };
    _.state = {};
    _._state = {};
    _.state = new Proxy(_._state, {
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

export const CLI = _ => ({
  name: "menhera-cli",
  awake() {
    _.CLI = { structs: {}, Event: new EventEmitter() };
    _.onCli = ({ name, props }) => {
      const { desc, exec } = props;
      _.CLI.structs[name] = props;
      _.CLI.Event.on(name, exec);
    };
  },
  start() {
    let [command, ...val] = process.argv.slice(2);
    _.CLI.Event.emit(command, { val });
  },
  onCli: {
    foo: {
      exec({ val }) {
        console.log("bar");
      }
    }
  }
});
