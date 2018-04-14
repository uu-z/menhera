import { ConfigMerger } from "./utils";

export const _config = {
  _({ _, _key, _val, cp }) {
    _.config = ConfigMerger(_.config, _val);
    const { run } = _.config;
    if (run) {
      const { lifeCycle = [] } = _.config;
      Object.values(_).forEach(async cp => {
        await lifeCycle.forEach(key => {
          cp[key] && cp[key]({ _ });
        });
      });
    }
  }
};

export const _methods = {
  $({ _, _key, _val, cp }) {
    if (!cp[_key]) {
      cp[_key] = _val.bind(cp);
    } else {
      console.warn(
        `${cp.name} : "${_key}"  in methods is valid, Please use another one`
      );
    }
  }
};

export const _data = {
  $({ _, _key, _val, cp }) {
    if (!cp[_key]) {
      if (typeof _val === "function") {
        cp[_key] = _val.bind(cp);
      } else {
        cp[_key] = _val;
      }
    } else {
      console.warn(
        `${cp.name} : "${_key} " is data is valid, Please use another one`
      );
    }
  }
};
