import Menhera from "../../src";
import * as routes from "./routers";
import * as controllers from "./controllers";
import { hooks as koa } from "./menhera-koa";

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
