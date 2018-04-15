import Menhera from "../../src";
import Koa from "koa";
import Router from "koa-router";
import * as routes from "./routers";
import * as controllers from "./controllers";
import * as koa from "./hooks";

const _ = new Menhera({
  app: new Koa(),
  router: new Router(),
  controllers: {},
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
