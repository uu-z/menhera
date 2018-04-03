import { EventEmitter } from "events";
import { bindHook, ConfigMerger } from "./utils";
import { Init } from "./plugins";

export const initConfig = {
  lifeCycle: ["_awake", "start"],
  components: [Init]
};

export default class Menhera {
  constructor() {
    this.components = {};
    this.hooks = {};
    this.config = {};
  }
  init(config) {
    const _ = this;
    _.config = ConfigMerger(initConfig, config);
    const { components = {}, lifeCycle = [] } = _.config;

    components.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      _.components[name] = cp;

      lifeCycle.forEach(key => {
        if (key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });

      await Object.keys(cp).forEach(p => {
        if (p.startsWith("_")) {
          const hook = _.hooks[p];
          if (Array.isArray(hook)) {
            hook.forEach(h => {
              bindHook({ _, hook: h, p, cp });
            });
          } else {
            bindHook({ _, hook, p, cp });
          }
        }
      });

      await Object.keys(cp).forEach(prop => {
        if (!prop.startsWith("_")) {
          const hook = _["hooks"][prop];
          if (Array.isArray(hook)) {
            hook.forEach(h => {
              bindHook({ hook: h, prop, cp });
            });
          } else {
            bindHook({ hook, prop, cp });
          }
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
