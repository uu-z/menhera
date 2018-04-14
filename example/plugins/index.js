import { ConfigMerger } from "./utils";

export const _config = {
  _({ _, _key, _val, cp }) {
    _.config = ConfigMerger(_.config, _val);
  }
};

export const _command = {
  _({ _, _key, _val, cp }) {
    const { start } = _val;
    if (start) {
      const { lifeCycle = [] } = _.config;
      Object.values(_).forEach(async cp => {
        await lifeCycle.forEach(key => {
          cp[key] && cp[key]();
        });
      });
    }
  }
};

export const _methods = {
  _({ _, _key, _val, cp }) {
    for (let [key, val] of Object.entries(_val)) {
      if (!cp[key]) {
        cp[key] = val.bind(cp);
      } else {
        console.warn(
          `${cp.name} : "${key}"  in methods is valid, Please use another one`
        );
      }
    }
  }
};

export const _data = ({ _, _key, _val, cp }) => {
  for (let [key, val] of Object.entries(_val.bind(cp)())) {
    if (!cp[key]) {
      if (typeof val === "function") {
        cp[key] = val.bind(cp);
      } else {
        cp[key] = val;
      }
    } else {
      console.warn(
        `${cp.name} : "${key} " is data is valid, Please use another one`
      );
    }
  }
};
