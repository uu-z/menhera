import { bindHook, ConfigMerger } from "./utils";
import { v000 } from "./plugins";

const initConfig = {
  lifeCycle: ["awake", "start"]
};

export const core = ({ _, parms }) => {
  _.components = {};
  _.hooks = {};
  _.config = initConfig;
  _.hooks._hooks = [
    ({ _key, _val, cp }) => {
      for (let [key, val] of Object.entries(_val())) {
        if (val) {
          if (!_.hooks[key]) {
            _.hooks[key] = [];
          }
          _.hooks[key].push(val.bind(cp));
        }
      }
    }
  ];
  _.hooks._mount = [
    ({ _key, _val, cp }) => {
      const { lifeCycle = [] } = _.config;
      for (let [key, components] of Object.entries(_val)) {
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
    }
  ];

  _.$use = parms => {
    Object.keys(parms).forEach(_key => {
      bindHook({ _, _key, cp: parms });
    });
  };

  _.$use({
    _mount: {
      0: [v000]
    }
  });

  _.$use(parms);
  return _;
};
