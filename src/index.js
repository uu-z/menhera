import { EventEmitter } from "events";
import { bindHook } from "./utils";
import { Init } from "./plugins";

const initConfig = {
  lifeCycle: ["_awake", "start"],
  components: [Init]
};

export default class Menhera {
  constructor({ components, lifeCycle, ...other }) {
    this.components = {};
    this.hooks = {};
    this.methods = {};
    this.config = {
      components: [...initConfig.components, ...components],
      lifeCycle: lifeCycle ? lifeCycle : initConfig.lifeCycle,
      ...other
    };
  }
  init() {
    const _ = this;
    const { components = [], lifeCycle = [] } = _.config;

    components.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      _.components[name] = cp;

      lifeCycle.forEach(key => {
        if (key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });

      await Object.keys(cp).forEach(prop => {
        if (prop.startsWith("_")) {
          const hook = _.hooks[prop];
          if (Array.isArray(hook)) {
            hook.forEach(h => {
              bindHook({ hook: h, prop, cp });
            });
          } else {
            bindHook({ hook, prop, cp });
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
