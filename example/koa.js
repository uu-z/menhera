import koa from "koa";
import Router from "koa-router";
import Menhera from "../src";

const app = {
  name: "app",
  app: new koa(),
  router: new Router(),
  _hooks: {
    koa: {
      data: {
        $({ _key, _val }) {
          if (!this[_key]) {
            this[_key] = _val;
          }
        }
      },
      controller({ _, _key, _val, cp }) {
        this.controllers = _val(this);
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
    data: {
      test: { index: 0, user: "" }
    },
    controller: ({ test }) => ({
      index: {
        getIndex(ctx) {
          ctx.body = test.index++;
        }
      },
      user: {
        getUser(ctx) {
          test.user = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5);
          ctx.body = test.user;
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
