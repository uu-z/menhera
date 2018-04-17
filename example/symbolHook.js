import Menhera from "../src";

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        $F({ _key, _val }) {
          console.log(_key, _val);
        },
        $V({ _key, _val }) {
          console.log(_key, _val);
        },
        $O({ _key, _val }) {
          console.log(_key, _val);
        }
      }
    }
  },
  foo: {
    bar: {
      test$F() {},
      test$F1() {},
      test$V: 1,
      test$V1: 2,
      test$O: {},
      test$O1: {}
    }
  }
});
