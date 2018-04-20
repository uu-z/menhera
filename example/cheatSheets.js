import Menhera from "../src";

const _ = new Menhera({
  _hooks: {
    foo: {
      bar0: {
        _({ _key, _val }) {
          console.log(`_:`, _key, _val);
        }
      },
      bar1: {
        $F({ _key, _val }) {
          console.log(`$F:`, _key, _val);
        },
        $V({ _key, _val }) {
          console.log(`$V:`, _key, _val);
        },
        $O({ _key, _val }) {
          console.log(`$O:`, _key, _val);
        },
        $A({ _key, _val }) {
          console.log(`$A`, _key, _val);
        }
      },
      bar2: {
        A({ _val }) {
          console.log(`A:`, _val);
        },
        A$({ _key, _val }) {
          console.log(`A$_${_key}:`, _val);
        }
      },
      bar3: {
        O({ _key, _val }) {
          console.log(`O:`, _key, _val);
        },
        O$({ _key, _val }) {
          console.log(`O$:`, _key, _val);
        }
      }
    }
  },
  foo: {
    bar0: {},
    bar1: {
      F() {},
      V: 0,
      O: {},
      A: []
    },
    bar2: [{}, {}],
    bar3: {
      A: 0,
      F: () => {},
      O: {}
    }
  }
});
