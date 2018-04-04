import { EventEmitter } from "events";
import Menhera, { v1 } from "../src";
import minimist from "minimist";

export const CLI = {
  name: "CLI",
  _data() {
    return {
      structs: {},
      Event: new EventEmitter()
    };
  },
  start() {
    let { _, ...flags } = minimist(process.argv.slice(2));
    let [command = "*", ...inputs] = _;
    const { h, help } = flags;
    if (h && help) {
      let command = this.structs[command];
      command && command.help && command.help();
    } else {
      this.Event.emit(command, { inputs, flags });
    }
  },
  _hooks() {
    return {
      onCli({ key, val, cp }) {
        const { exec } = val;
        this.structs[key] = val;
        if (exec) {
          this.Event.on(key, exec.bind(cp));
        }
      }
    };
  }
};

const cliTest = {
  name: "clitest",
  onCli: {
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
  }
};

const _ = new Menhera({
  // lifeCycle: ["_awake", "start"],
  $mount: {
    1: [v1],
    2: [CLI]
  }
}).$mount({
  2: [cliTest]
});
