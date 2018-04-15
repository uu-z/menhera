import { $ } from "../../src";
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
  $({ _, _key, _val, cp }) {
    this.controllers[_key] = { ...this.controllers[_key], ..._val(this) };
  }
};

export const routes = {
  $({ _, _key, _val, cp }) {
    const { router } = this;
    const routers = _val(this);
    $(routers, (key, val) => {
      const [method, path] = key.split(" ");
      router[method](path, ctx => val(ctx));
    });
  }
};

export function listen({ _, _key, _val, cp }) {
  const { app } = this;
  this.app.use(this.router.routes());

  app.listen(_val, e => {
    console.log(`app running on port: ${_val}`);
  });
}
