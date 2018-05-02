import Mhr, { $merge } from "../dist";
import * as routes from "./koa/routers";
import * as controllers from "./koa/controllers";
import * as models from "./koa/model";
import * as koa from "./koa/hooks";
import * as mongoose from "./koa/mongoose";

Mhr.$use({
  _hooks: {
    koa: $merge([koa, mongoose])
  },
  koa: {
    models,
    controllers,
    routes,
    config: {
      listen: 3000,
      dbConfig: {
        auth: false,
        user: "admin",
        dbname: "data",
        pwd: "xxx",
        uri: "localhost:27017/"
      }
    }
  }
});
