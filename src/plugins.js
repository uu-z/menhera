import { EventEmitter } from "events";

export const Observer = {
  name: "menhera-observer",
  awake({ _ }) {
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
        _.Observer.Event.emit(key, { _, val });
        return true;
      }
    });
    _.observer = ({ name, event }) => {
      _.Observer.Event.on(name, event);
    };
  },
  observer: {
    foo() {
      console.log("bar");
    }
  }
};

export const Event = {
  name: "menhera-event",
  awake({ _ }) {
    _.Event = new EventEmitter();
    _.on = ({ name, event }) => {
      _.Event.on(name, event);
      return _;
    };

    _.emit = (name, ...val) => {
      _.Event.emit(name, { _, val });
      return _;
    };
  },
  on: {
    foo() {
      console.log("bar");
    }
  }
};

export const CLI = {
  name: "menhera-cli",
  awake({ _ }) {
    _.CLI = { structs: {}, Event: new EventEmitter() };
    _.onCli = ({ name, props }) => {
      const { desc, exec } = props;
      _.CLI.structs[name] = props;
      _.CLI.Event.on(name, exec);
    };
  },
  start({ _ }) {
    let [command, ...val] = process.argv.slice(2);
    _.CLI.Event.emit(command, { _, val });
  },
  onCli: {
    foo: {
      exec({ _, val }) {
        console.log("bar");
      }
    }
  }
};
