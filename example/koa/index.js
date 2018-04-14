import Menhera from "../../src";
import * as routes from "./routers";
import * as controllers from "./controllers";
import { hooks } from "./menhera-koa";

const app = {
  name: "koa",
  _hooks: {
    koa: hooks
  }
};

const _ = new Menhera({
  _mount: {
    app
  },
  koa: {
    data: {
      test: { index: 0, user: "" }
    },
    controllers,
    routes
  },
  listen: 3000
});
