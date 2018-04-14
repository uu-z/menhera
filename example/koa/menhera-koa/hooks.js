import koa from "koa";

export function _() {
  !this["app"] && (this["app"] = new koa());
}

export const data = {
  $({ _key, _val }) {
    if (!this[_key]) {
      this[_key] = _val;
    }
  }
};

export const use = {
  $({ _key, _val }) {
    this.app.use(_val);
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

import Router from "koa-router";
export const routes = {
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
};

export function listen({ _, _key, _val, cp }) {
  const { app } = this;
  this.app.use(this.router.routes());

  app.listen(_val, e => {
    console.log(`app running on port: ${_val}`);
  });
}
