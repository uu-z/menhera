import Menhera from "../dist";

const middleware = {
  name: "middleware",
  middlewares: {},
  _hooks: {
    middleware: {
      use: {
        $({ _key, _val }) {
          if (!this.middlewares[_key]) {
            this.middlewares[_key] = [];
          }
          this.middlewares[_key] = [...this.middlewares[_key], ..._val];
        }
      },
      run: {
        $({ _key, _val }) {
          let funcs = this.middlewares[_key].reduce((a, b) => (...args) =>
            b(a(...args))
          );
          funcs(_val);
        }
      }
    }
  }
};

const addFoo = ctx => {
  ctx.foo++;
  return ctx;
};
const logFoo = ctx => {
  console.log(ctx.foo);
  return ctx;
};

const _ = new Menhera({
  _mount: {
    middleware
  },
  middleware: {
    use: {
      test: [addFoo, addFoo, logFoo]
    },
    run: {
      test: {
        foo: 0
      }
    }
  }
});
