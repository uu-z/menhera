# Menhera

an experimental lovely frame

```bash
yarn add menhera
```

```js
import Menhera from "menhera";

const test = ({ _val }) => console.log(_val);

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test
          }
        }
      }
    }
  },
  foo: {
    bar: {
      foo1: {
        bar1: {
          test: "foo bar"
        }
      }
    }
  }
});
```

```js
const test = ({ _val }) => console.log(_val);

const mount = {
  name: "mount",
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test
          }
        }
      }
    }
  }
};

const _ = new Menhera({
  _mount: {
    foo: [mount]
  }
}).$use({
  foo: {
    bar: {
      foo1: {
        bar1: {
          test: "foo bar"
        }
      }
    }
  }
});
```
