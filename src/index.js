import { EventEmitter } from "events";
import { bindHook, ConfigMerger } from "./utils";
import { INIT } from "./plugins";

export const initConfig = {
  lifeCycle: ["_awake", "start"],
  components: [INIT]
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
    console.log(components);
    components.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      _.components[name] = cp;

      lifeCycle.forEach(key => {
        if (key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });

      await Object.keys(cp).forEach(_key => {
        if (_key.startsWith("_")) {
          const hook = _.hooks[_key];
          if (Array.isArray(hook)) {
            hook.forEach(h => {
              bindHook({ _, hook: h, _key, cp });
            });
          } else {
            bindHook({ _, hook, _key, cp });
          }
        }
      });

      await Object.keys(cp).forEach(_key => {
        if (!_key.startsWith("_")) {
          const hook = _["hooks"][_key];
          if (Array.isArray(hook)) {
            hook.forEach(h => {
              bindHook({ hook: h, _key, cp });
            });
          } else {
            bindHook({ hook, _key, cp });
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
