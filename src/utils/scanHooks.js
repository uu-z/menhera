import get from "lodash.get";
import set from "lodash.set";
import { $ } from "../utils";

export const $use = _ => ({
  onAny: {
    any({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    },
    _({ object, depth, _key, _val, _object }) {
      const __ = `${depth}._`;
      const _Hooks = get(_.hooks, __, []);
      _Hooks.length > 0 &&
        _Hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    }
  },
  onObject: {
    O({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.O`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    },
    $({ object, depth, _key, _val, _object }) {
      const key = `${depth}.$`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 &&
        $(_val, (key, val) => {
          hooks.forEach(h => h({ _, _key: key, _val: val, cp: _object }));
        });
    },
    O$({ object, depth, _key, _val, _object }) {
      const key = `${depth}.O$`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 &&
        $(_val, (key, val) => {
          hooks.forEach(h => h({ _, _key: key, _val: val, cp: _object }));
        });
    },
    $O({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$O`;
      const $hooks = get(_.hooks, key, []);
      $hooks.length > 0 &&
        $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    }
  },
  onArray: {
    A({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.A`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    },
    A$({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.A$`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 &&
        _val.forEach((val, i) => {
          hooks.forEach(h => h({ _, i, _val: val, cp: _object }));
        });
    },
    $A({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$A`;
      const $hooks = get(_.hooks, key, []);
      $hooks.length > 0 &&
        $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    }
  },
  onFunction: {
    F({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.F`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    },
    $F({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$F`;
      const $hooks = get(_.hooks, key, []);
      $hooks.length > 0 &&
        $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    }
  },
  onVariable: {
    V({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.V`;
      const hooks = get(_.hooks, key, []);
      hooks.length > 0 && hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    },
    $V({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$V`;
      const $hooks = get(_.hooks, key, []);
      $hooks.length > 0 &&
        $hooks.forEach(h => h({ _, _key, _val, cp: _object }));
    }
  }
});
