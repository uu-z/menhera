import koa from "koa";
import Router from "koa-router";
import Menhera, { _data } from "../src";

const app = ({ _ }) => ({
  name: "app",
  _data() {
    return {
      app: new koa(),
      router: new Router(),
      test: { index: 0, user: "" },
      services: {
        getIndex: () => this.test.index,
        getUser: () => this.test.user
      }
    };
  },
  _hooks: {
    koa: {
      router({ _, _key, _val, cp }) {
        const { router } = this;
        const routers = _val(this);
        for (let [key, val] of Object.entries(routers)) {
          const [method, path] = key.split(" ");
          router[method](path, ctx => val(ctx));
        }
      },
      controller({ _, _key, _val, cp }) {
        const controllers = _val(this);
        this.controllers = controllers;
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
});

const _ = new Menhera({
  _hooks: { _data },
  _mount: {
    foo: [app]
  },
  koa: {
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
    }),
    listen: 3000
  }
});
