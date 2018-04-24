import Mhr from "../dist";
import Koa from "koa";
import Router from "koa-router";
import * as routes from "./koa/routers";
import * as controllers from "./koa/controllers";
import * as koa from "./koa/hooks";


Mhr.$use({
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
