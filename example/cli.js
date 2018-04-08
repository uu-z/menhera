import { EventEmitter } from "events";
import Menhera from "../src";
import minimist from "minimist";

export const CLI = {
  name: "CLI",
  Event: new EventEmitter(),
  _hooks: {
    CLI: {
      commands: {
        $({ _key, _val, cp }) {
          const { exec } = _val;
          this.Event.on(_key, exec.bind(cp));
        }
      },
      config: {
        _({ _val }) {
          const { start } = _val;
          if (start) {
            let { _, ...flags } = minimist(process.argv.slice(2));
            let [command = "*", ...inputs] = _;
            this.Event.emit(command, { inputs, flags });
          }
        }
      }
    }
  }
};

const _ = new Menhera({
  _mount: {
    cli: [CLI]
  }
}).$use({
  CLI: {
    commands: {
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
    },
    config: {
      start: true
    }
  }
});
