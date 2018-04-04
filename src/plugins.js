import { bindHook, ConfigMerger } from "./utils";

export const _hooks = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val())) {
    if (val) {
      if (!_.hooks[key]) {
        _.hooks[key] = [];
      }
      _.hooks[key].push(val.bind(cp));
    }
  }
};

export const _mount = ({ _, _key, _val, cp }) => {
  const { lifeCycle = [] } = _.config;
  for (let [key, components] of Object.entries(_val)) {
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
          bindHook({ _, _key, cp });
        }
      });
    });
  }
};

export const _config = ({ _, _key, _val, cp }) => {
  _.config = ConfigMerger(_.config, _val);
};
export const _command = ({ _, _key, _val, cp }) => {
  const { run } = _val;
  if (run) {
    const { lifeCycle = [] } = _.config;
    Object.values(_.components).forEach(async cp => {
      await Object.keys(cp).forEach(_key => {
        if (!_key.startsWith("_")) {
          bindHook({ _, _key, cp });
        }
      });

      lifeCycle.forEach(key => {
        if (!key.startsWith("_")) {
          cp[key] && cp[key]();
        }
      });
    });
  }
};

export const _methods = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val)) {
    if (!cp[key]) {
      cp[key] = val.bind(cp);
    } else {
      console.warn(
        `${cp.name} : "${key}"  in methods is valid, Please use another one`
      );
    }
  }
};

export const _data = ({ _, _key, _val, cp }) => {
  const props = _val.bind(cp)();
  for (let [key, val] of Object.entries(props)) {
    if (!cp[key]) {
      cp[key] = val;
    } else {
      console.warn(
        `${cp.name} : "${key} " is data is valid, Please use another one`
      );
    }
  }
};
