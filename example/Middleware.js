import Menhera from "../src";

const Queue = {
  name: "queue",
  queues: {},
  _hooks: {
    Queue: {
      use: {
        $({ _key, _val }) {
          if (!this.queues[_key]) {
            this.queues[_key] = [];
          }
          this.queues[_key] = [...this.queues[_key], ..._val];
        }
      },
      run: {
        $({ _key, _val }) {
          let funcs = this.queues[_key].reduce((a, b) => (...args) =>
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
    Queue
  },
  Queue: {
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
