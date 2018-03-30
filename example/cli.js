import Menhera, { CLI } from "../src";

const cliTest = _ => ({
  name: "clitest",
  onCli: {
    test: {
      exec({ _, val }) {
        console.log(val);
      }
    }
  }
});

const _ = new Menhera({
  components: [CLI, cliTest]
}).init();
