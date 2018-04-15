# Menhera

an experimental lovely frame

### Install

```bash
yarn add menhera
```

### Example

```js
import Menhera from "menehra";

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

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            $: testEach,
            _: testRoot,
            test,
            testFn
          }
        }
      }
    }
  },
  foo: {
    bar: {
      foo1: {
        bar1: {
          test: "foo bar",
          testFn: () => "foo bar"
        }
      }
    }
  }
});
```

![index](./assets/index.png)

```js
const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        $({ _key, _val }) {
          console.log(`${_key}: ${_val}`);
        }
      }
    }
  }
});

_.$set({
  foo: {
    bar: {
      test: 123
    }
  }
});

_.$use(
  _.$get({
    foo: {
      bar: {
        test: 233,
        test1: 456
      }
    }
  })
);
```

![getset](./assets/getset.png)
