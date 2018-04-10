import { EventEmitter } from "events";
import Menhera from "../src";
import parser from "yargs-parser";
const { isArray } = Array;
const { entries } = Object;

const commandRegex = /\.*[\][<>]/g;

const CLI = {
  name: "CLI",
  Event: new EventEmitter(),
  options: {},
  args: {},
  commands: {},
  _hooks: {
    CLI: {
      options: {
        _({ _key, _val, cp }) {
          Object.assign(this.options, _val);
        }
      },
      commands: {
        $({ _key, _val, cp }) {
          // const { exec, ...other } = _val;
          if (commandRegex.test(_key)) {
            const [command, ...other] = _key
              .replace(commandRegex, "")
              .split(" ");
            this.commands[command] = {
              args: other
            };
            this.Event.on(command, _val);
          } else {
            this.Event.on(_key, _val);
          }
        }
      },
      config: {
        _({ _, _val }) {
          const { start, target } = _val;

          if (start) {
            let { _: __, ...options } = parser(target || process.argv.slice(2));
            let [_key = "*", ..._args] = __;
            for (let [key, val] of entries(options)) {
              this.args[key] = val;
              const { alias } = this.options[key] || {};
              if (alias) {
                this.args[alias] = val;
              }
            }
            const { args = [] } = this.commands[_key] || {};
            args.forEach((argv, i) => {
              this.args[argv] = _args[i];
            });
            this.Event.emit(_key, {
              CLI: this,
              ...this.args
            });
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
    options: {
      v: {
        alias: "version",
        desc: "version"
      },
      h: {
        alias: "help",
        decs: "help"
      }
    },
    commands: {
      "*"({ help }) {
        console.log(`this is help`);
      },
      "serve [port]"({ port }) {
        console.log(`server running on port:${port}`);
      }
    },
    config: {
      version: "0.0.1",
      start: true
    }
  }
});
