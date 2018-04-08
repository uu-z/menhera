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
  for (let [key, val] of Object.entries(_val)) {
    typeof val === "function" && testFn({ _val: val });
    typeof val !== "function" && test({ _val: val });
  }
};

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            _: testEach,
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

```js
import { core } from "menhera";

class Foo {
  constructor() {}
}
const Bar = parms => core({ _: new Foo(), parms });

const _ = new Bar({});
```

```js
import koa from "koa";
import Router from "koa-router";
import Menhera from "menhera";

const app = {
  name: "app",
  app: new koa(),
  router: new Router(),
  _hooks: {
    koa: {
      data({ _, _key, _val, cp }) {
        for (let [key, val] of Object.entries(_val.bind(this)())) {
          if (!this[key]) {
            this[key] = val;
          }
        }
      },
      controller({ _, _key, _val, cp }) {
        const controllers = _val(this);
        this.controllers = controllers;
      },
      router({ _, _key, _val, cp }) {
        const { router } = this;
        const routers = _val(this);
        for (let [key, val] of Object.entries(routers)) {
          const [method, path] = key.split(" ");
          router[method](path, ctx => val(ctx));
        }
      },
      listen({ _, _key, _val, cp }) {
        const { app } = this;
        app.use(this.router.routes());
        app.listen(_val, e => {
          console.log(`app running on port: ${_val}`);
        });
      }
    }
  }
};

const _ = new Menhera({
  _mount: {
    foo: [app]
  },
  koa: {
    data() {
      return {
        test: { index: 0, user: "" },
        services: {
          getIndex: () => this.test.index,
          getUser: () => this.test.user
        }
      };
    },
    controller: ({ test, services: { getIndex, getUser } }) => ({
      index: {
        getIndex(ctx) {
          test.index++;
          ctx.body = getIndex();
        }
      },
      user: {
        getUser(ctx) {
          test.user = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5);
          ctx.body = getUser();
        }
      }
    }),
    router: ({ controllers: { index, user } }) => ({
      "get /": index.getIndex,
      "get /user": user.getUser
    })
  }
}).$use({
  koa: {
    listen: 3000
  }
});
```
