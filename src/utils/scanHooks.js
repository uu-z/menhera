import { $, $M, HOOKS, get, set } from "../utils";

const handleHooks = ({ key, _key, _, _val, _object }) => {
  const hooks = get(_[HOOKS], key);
  hooks &&
    $M(hooks, (uuid, h) => {
      h({ _, _key, _val, cp: _object });
    });
};

const handleEachHooks = ({ _, key, _key, _val, _object }) => {
  const hooks = get(_[HOOKS], key);
  hooks &&
    $(_val, (key, val) => {
      $M(hooks, (uuid, h) => h({ _, _key: key, _val: val, cp: _object }));
    });
};

export const useHooks = _ => ({
  onAny: {
    any({ object, parentDepth, depth, _key, _val, _object }) {
      if (typeof _val === "object") return;
      const key = `${depth}`;
      handleHooks({ key, _, _key, _val, _object });
    },
    _({ object, depth, _key, _val, _object }) {
      const key = `${depth}._`;
      handleHooks({ key, _, _key, _val, _object });
    }
  },
  onObject: {
    O({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.O`;
      handleHooks({ key, _, _key, _val, _object });
    },
    $({ object, depth, _key, _val, _object }) {
      const key = `${depth}.$`;
      handleEachHooks({ key, _, _val, _object });
    },
    O$({ object, depth, _key, _val, _object }) {
      const key = `${depth}.O$`;
      handleEachHooks({ key, _, _val, _object });
    },
    $O({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$O`;
      handleHooks({ key, _, _key, _val, _object });
    }
  },
  onArray: {
    A({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.A`;
      handleHooks({ key, _, _key, _val, _object });
    },
    A$({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.A$`;
      handleEachHooks({ key, _, _val, _object });
    },
    $A({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$A`;
      handleHooks({ key, _, _key, _val, _object });
    }
  },
  onFunction: {
    F({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.F`;
      handleHooks({ key, _, _key, _val, _object });
    },
    $F({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$F`;
      handleHooks({ key, _, _key, _val, _object });
    }
  },
  onVariable: {
    V({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${depth}.V`;
      handleHooks({ key, _, _key, _val, _object });
    },
    $V({ object, parentDepth, depth, _key, _val, _object }) {
      const key = `${parentDepth}.$V`;
      handleHooks({ key, _, _key, _val, _object });
    }
  }
});
