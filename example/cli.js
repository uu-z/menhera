import { EventEmitter } from "events";
import Menhera from "../src";
import minimist from "minimist";

export const CLI = ({ _ }) => ({
  name: "CLI",
  _data() {
    return {
      structs: {},
      Event: new EventEmitter()
    };
  },
  start() {
    let { _: __, ...flags } = minimist(process.argv.slice(2));
    let [command = "*", ...inputs] = __;
    const { h, help } = flags;
    if (h && help) {
      let command = this.structs[command];
      command && command.help && command.help();
    } else {
      this.Event.emit(command, { inputs, flags });
    }
  },
  _hooks: {
    onCli({ name, props }) {
      const { exec, cp } = props;
      this.structs[name] = props;
      if (exec) {
        this.Event.on(name, exec.bind(cp));
      }
    }
  }
});

const cliTest = {
  name: "clitest",
  onCli: {
    "*": {
      help() {
        console.log("* help");
      }
    },
    test: {
      exec({ inputs, flags }) {
        console.log(inputs, flags);
      }
    }
  }
};

const _ = new Menhera();

_.init({
  components: [CLI, cliTest]
});
