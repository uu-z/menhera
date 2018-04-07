import { EventEmitter } from "events";
import Menhera from "../src";
import { _data, _config, _command } from "./plugins";
import minimist from "minimist";

export const CLI = {
  name: "CLI",
  _data() {
    return {
      Event: new EventEmitter()
    };
  },
  start() {
    let { _, ...flags } = minimist(process.argv.slice(2));
    let [command = "*", ...inputs] = _;
    const { h, help } = flags;

    this.Event.emit(command, { inputs, flags });
  },
  _hooks: {
    onCli({ _, _key, _val, cp }) {
      for (let [key, val] of Object.entries(_val())) {
        const { exec } = val;
        if (exec) {
          this.Event.on(key, exec.bind(cp));
        }
      }
    }
  }
};

const _ = new Menhera({
  _hooks: {
    _data,
    _config,
    _command
  },
  _config: {
    lifeCycle: ["start"]
  },
  _mount: {
    cli: [CLI]
  }
}).$use({
  onCli: () => ({
    "*": {
      exec() {
        console.log("help");
      }
    },
    test: {
      exec({ inputs, flags }) {
        console.log(inputs, flags);
      }
    }
  }),
  _command: {
    start: true
  }
});
