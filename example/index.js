import Menhera, { Observer, Event } from "../src";

let Test = _ => ({
  name: "test",
  awake() {
    console.log("test0");
  },
  start() {
    const { config: { observable: ob } } = _;
    ob.test1 = "test1";
    ob.test2 = "test2";
    ob.test3 = ob.test3;
    _.emit("test4", "test", "4");
    _.emit("test5", "test", "5");
  },
  onObserver: {
    test1({ val }) {
      console.log(val);
    },
    test2({ val }) {
      console.log(val);
    },
    test3({ val }) {
      console.log(val);
    }
  },
  onEvent: {
    test4({ val }) {
      console.log(val.join(""));
    },
    test5({ val }) {
      console.log(val.join(""));
    }
  }
});

const _ = new Menhera({
  components: [Observer, Event, Test],
  observable: { test3: "test3" }
}).init();
