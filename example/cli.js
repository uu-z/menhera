import Menhera, { CLI } from "../src";

const cliTest = {
  name: "clitest",
  onCli: {
    test: {
      exec({ _, val }) {
        console.log(val);
      }
    }
  }
};

const _ = new Menhera({
  components: [CLI, cliTest]
}).init();
