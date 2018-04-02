import { EventEmitter } from "events";
import Menhera from "../src";

export const CLI = ({ name = "CLI" }) => ({ _, $ = _.components[name] }) => ({
  name,
  structs: {},
  Event: new EventEmitter(),
  start() {
    let [command, ...val] = process.argv.slice(2);
    _.components[name].Event.emit(command, {
      val
    });
  },
  _hooks: {
    onCli: ({ name, props }) => {
      const { desc, exec } = props;
      $.structs[name] = props;
      $.Event.on(name, exec);
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
