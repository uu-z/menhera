# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera, { Observer, Event } from "menhera";

const _ = new Menhera({
  components: [
    Observer,
    Event,
    {
      name: "test",
      awake() {
        console.log("test0");
      },
      start({ _ }) {
        _.state.test1 = "test1";
        _.state.test2 = "test2";
        _.emit("test4", "test", "4");
        _.emit("test5", "test", "5");
      },
      observer: {
        test1({ val }) {
          console.log(val);
        },
        test2({ val }) {
          console.log(val);
        }
      },
      on: {
        test4({ val }) {
          console.log(val.join(""));
        },
        test5({ val }) {
          console.log(val.join(""));
        }
      }
    }
  ]
}).init();
```
