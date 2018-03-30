# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera, { Observer, Event } from "menhera";

let Test = _ => ({
  name: "test",
  awake() {
    console.log("test0");
  },
  start() {
    _.state.test1 = "test1";
    _.state.test2 = "test2";
    _.emit("test4", "test", "4");
    _.emit("test5", "test", "5");
  },
  onObserver: {
    test1({ val }) {
      console.log(val);
    },
    test2({ val }) {
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
  components: [Observer, Event, Test]
}).init();
```
