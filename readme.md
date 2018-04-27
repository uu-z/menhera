# Menhera

an experimental lovely frame

### Install

```bash
yarn add menhera
```

### Example

```js
import Mhr from "menehra";

const test = ({ _val }) => console.log(_val);
const testFn = ({ _val }) => console.log(_val());
const testEach = ({ _val }) => {
  typeof _val === "function" && testFn({ _val });
  typeof _val !== "function" && test({ _val });
};
const testRoot = ({ _val }) => {
  for (let [key, val] of Object.entries(_val)) {
    testEach({ _val: val });
  }
};

Mhr.$use({
  _hooks: {
    "foo.bar.foo1.bar1": {
      $: testEach,
      _: testRoot,
      test,
      testFn
    }
  },
  "foo.bar.foo1.bar1": {
    test: "foo bar",
    testFn: () => "foo bar"
  }
});
```

![index](./assets/index.png)

```js
import { $match, $str } from "menhera";

let obj = {
  loading: true,
  error: true,
  foo: {
    foo: 123,
    bar: 123
  }
};

let loading = $str({ equal: { loading: true }, get: { loading: "" } });
let error = $str({ valid: { error: "" }, get: { error: "" } });
let foobar = $str({
  equal: { foo: { bar: 123 } },
  get: { bar: "foo.bar" }
});

$match(obj, {
  [loading]: ({ loading }) => console.log("loading", loading),
  [error]: ({ error }) => console.log("error", error),
  [foobar]: ({ bar }) => console.log(bar)
});
```

![getset](./assets/getset.png)
