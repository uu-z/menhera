import { $ } from "../../dist";
import Koa from "koa";
import Router from "koa-router";

let app = new Koa();

export const use = {
  $({ _key, _val }) {
    app.use(_val);
  }
};

export const controllers = {
  _() {
    !this.controllers && (this.controllers = {});
  },
  $({ _, _key, _val, cp }) {
    this.controllers[_key] = { ...this.controllers[_key], ..._val(this) };
  }
};

export const routes = {
  _() {
    if (!this.router) this.router = new Router();
  },
  $({ _, _key, _val, cp }) {
    const { router } = this;
    const routers = _val(this);
    $(routers, (key, val) => {
      const [method, path] = key.split(" ");
      router[method](path, ctx => val(ctx));
    });
  }
};

export const config = {
  listen({ _, _key, _val, cp }) {
    this.add = app;
    app.use(this.router.routes());

    app.listen(_val, e => {
      console.log(`app running on port: ${_val}`);
    });
  }
};
