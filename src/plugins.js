import { bindHook, ConfigMerger } from "./utils";

export const $use = ({ _ }) => parms => {
  Object.keys(parms).forEach(_key => {
    bindHook({ _, _key, cp: parms });
  });
};

export const _hooks = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val.bind(cp)())) {
    if (val) {
      if (!_.hooks[key]) {
        _.hooks[key] = [];
      }

      if (!_.hooks[key].includes(val.bind(cp))) {
        _.hooks[key].push(val.bind(cp));
      }
    }
  }
};

export const _mount = ({ _, _key, _val, cp }) => {
  for (let [key, cps] of Object.entries(_val)) {
    cps.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      const { name } = cp;
      _.cps[name] = cp;

      await Object.keys(cp).forEach(_key => {
        bindHook({ _, _key, cp });
      });
    });
  }
};

export const _config = ({ _, _key, _val, cp }) => {
  _.config = ConfigMerger(_.config, _val);
};

export const _command = ({ _, _key, _val, cp }) => {
  const { start } = _val;
  if (start) {
    const { lifeCycle = [] } = _.config;
    Object.values(_.cps).forEach(async cp => {
      await lifeCycle.forEach(key => {
        cp[key] && cp[key]();
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
  for (let [key, val] of Object.entries(_val.bind(cp)())) {
    if (!cp[key]) {
      cp[key] = val;
    } else {
      console.warn(
        `${cp.name} : "${key} " is data is valid, Please use another one`
      );
    }
  }
};
