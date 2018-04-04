import { bindHook, ConfigMerger } from "./utils";
import { v0 } from "./plugins";

const initConfig = {
  lifeCycle: ["_awake", "start"],
  $mount: { 0: [v0] }
};

export default class Menhera {
  constructor(config) {
    this.components = {};
    this.hooks = {};
    this.config = ConfigMerger(initConfig, config);
    this.$mount(this.config.$mount);
  }
  $mount(mounts) {
    let _ = this;
    const { lifeCycle = [] } = _.config;
    for (let [key, components] of Object.entries(mounts)) {
      components.forEach(async component => {
        let cp =
          typeof component === "function"
            ? component({ _, $: lifeCycle })
            : component;
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
      });
    }
    return this;
  }

  $go() {
    const _ = this;
    const { lifeCycle = [] } = _.config;
    Object.values(this.components).forEach(async cp => {
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
