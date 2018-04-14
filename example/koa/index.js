import Menhera from "../../src";
import * as routes from "./routers";
import * as controllers from "./controllers";
import koa from "./menhera-koa";

const _ = new Menhera({
  _mount: {
    foo: [koa]
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
