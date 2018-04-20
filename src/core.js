import { scanObject, $ } from "./utils";
import * as scan from "./utils/scan";
import * as initHooks from "./utils/hooks";
import get from "lodash.get";
import set from "lodash.set";
export const $core = (_, _object) => {
  _.hooks = {};
  _.hooks._hooks = { _: [_hooks] };
  $(initHooks, (key, val) => {
    _.hooks[key] = val(_);
  });
  _.scan = {};
  $(scan, (key, val) => {
    _.scan[key] = val(_);
  });
  _.$use = _object => $use(_, _object);
  _.$get = _object => $get(_, _object);
  _.$set = _object => $set(_, _object);
  _.$use({ _hooks: { _mount } });
  _.$use(_object);
  return _;
};

export const $use = (_, _object) => {
  if (typeof _object === "object") {
    _.scan.$use(_object);
  }
  if (Array.isArray(_object)) {
    _object.forEach(o => {
      _.scan.$use(o);
    });
  }
  return _;
};

export const $set = (_, _object) => {
  if (typeof _object === "object") {
    return _.scan.$set(_object);
  }
};

export const $get = (_, _object) => {
  if (typeof _object === "object") {
    return _.scan.$get(_object);
  }
};

export const _hooks = ({ _, _val, cp }) => {
  if (typeof _val === "object") {
    _.scan._hook(_val, cp);
  }
};

export const _mount = {
  $({ _, _val, cp }) {
    let cps = Array.isArray(_val) ? _val : [_val];
    cps.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      _.$use(cp);
      const { name } = cp;
      if (_[name]) {
        throw new Error(`_mount: name "${name}" exists, please another one`);
      }
      _[name] = cp;
    });
  }
};
