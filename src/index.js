import { EventEmitter } from "events";
import { ConfigMerger, bindHook } from "./utils";

const initConfig = {
  lifeCycle: ["_awake", "start"]
};

export default class Menhera {
  constructor({ components, lifeCycle, ...other }) {
    this.components = {};
    this.config = {
      components,
      lifeCycle: lifeCycle ? lifeCycle : initConfig.lifeCycle,
      ...other
    };
  }
  init() {
    const _ = this;
    const { components = [], lifeCycle = [] } = _.config;

    components.forEach(async component => {
      let cp = typeof component === "function" ? component(_) : component;
      const { name } = cp;
      _.components[name] = cp;

      lifeCycle.forEach(key => {
        if (key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });

      await Object.keys(cp).forEach(prop => {
        const hook = _[prop];
        if (Array.isArray(hook)) {
          hook.forEach(h => {
            bindHook({ hook: h, prop, cp });
          });
        } else {
          bindHook({ hook, prop, cp });
        }
      });

      lifeCycle.forEach(key => {
        if (!key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });
    });
  }
}
