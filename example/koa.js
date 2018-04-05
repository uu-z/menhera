import koa from "koa";
import Menhera from "menhera";

const res = ctx => {
  ctx.body = `Hello Koa`;
};

const _koa = {
  name: "koa",
  _hooks: () => ({
    _koa: ({ _, _key, _val, cp }) => {
      const { listen, use } = _val;
      const app = new koa();
      if (use) {
        for (let [key, val] of Object.entries(use)) {
          app.use(val);
        }
      }

      if (listen) {
        app.listen(listen, e => {
          console.log(`app running on port: ${listen}`);
        });
      }
    }
  })
};

const _ = new Menhera({
  _mount: {
    _koa: [_koa]
  },
  _koa: {
    use: { res },
    listen: 3000
  }
});
