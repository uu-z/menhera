import mongoose from "mongoose";
import { $ } from "../../dist";

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const config = {
  dbConfig({ _val }) {
    const { user, pwd, uri, dbname, auth } = _val;
    let prefix = auth && user && pwd ? `${user}:${pwd}@` : "";
    let result = `mongodb://${prefix}${uri}${dbname ? dbname : ""}`;
    console.log(`db connecting: ${result}`);
    mongoose.connect(result);
  }
};

export const models = {
  _() {
    !this.models && (this.models = {});
  },
  $({ _key, _val }) {
    const { defs, opts, plugins } = _val;
    let schema = new mongoose.Schema(defs, opts);
    if (plugins) {
      $(plugins, (key, val) => {
        schema.plugin(val);
      });
    }
    this.models[_key] = mongoose.model(_key, schema);
  }
};
