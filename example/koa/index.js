import koa from "koa";
import Router from "koa-router";
import Menhera from "../../src";
import * as routes from "./routers";
import * as controllers from "./controllers";

const app = {
  name: "app",
  app: new koa(),
  _hooks: {
    koa: {
      data: {
        $({ _key, _val }) {
          if (!this[_key]) {
            this[_key] = _val;
          }
        }
      },
      controllers: {
        _() {
          !this.controllers && (this.controllers = {});
        },
        $({ _, _key, _val, cp }) {
          this.controllers[_key] = { ...this.controllers[_key], ..._val(this) };
        }
      },
      routes: {
        _() {
          !this.router && (this.router = new Router());
        },
        $({ _, _key, _val, cp }) {
          const { router } = this;
          const routers = _val(this);
          for (let [key, val] of Object.entries(routers)) {
            const [method, path] = key.split(" ");
            router[method](path, ctx => val(ctx));
          }
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
    controllers,
    routes
  }
}).$use({
  koa: {
    listen: 3000
  }
});
