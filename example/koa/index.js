import Menhera from "../../src";
import * as routes from "./routers";
import * as controllers from "./controllers";
import * as koa from "./hooks";

const _ = new Menhera({
  _hooks: {
    koa
  },
  koa: {
    data: {
      test: { index: 0, user: "" }
    },
    controllers,
    routes,
    listen: 3000
  }
});
