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
            typeof component === "function" ? component({ _ }) : component;
          const { name } = cp;
          _.components[name] = cp;

          lifeCycle.forEach(key => {
            if (key.startsWith("_")) {
              cp[key] && cp[key]();
            }
          });

          await Object.keys(cp).forEach(_key => {
            if (_key.startsWith("_")) {
              bindHook({ _, _key, cp });
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
