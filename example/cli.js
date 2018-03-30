import { EventEmitter } from "events";
import Menhera from "../src";

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

const cliTest = {
  name: "clitest",
  onCli: {
    test: {
      exec({ val }) {
        console.log(val);
      }
    }
  }
};

const _ = new Menhera({
  components: [CLI, cliTest]
}).init();
