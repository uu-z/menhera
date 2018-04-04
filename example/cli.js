import { EventEmitter } from "events";
import Menhera, { _methods, _data } from "../src";
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

    this.Event.emit(command, { inputs, flags });
  },
  _hooks: () => ({
    onCli({ _key, _val, cp }) {
      for (let [key, val] of Object.entries(_val)) {
        const { exec } = val;
        this.structs[key] = val;
        if (exec) {
          this.Event.on(key, exec.bind(cp));
        }
      }
    }
  })
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
  _hooks: () => ({
    _methods,
    _data
  }),
  _mount: {
    cli: [CLI, cliTest]
  }
}).$use({
  _command: {
    run: true
  }
});
