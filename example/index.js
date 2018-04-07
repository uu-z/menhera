import Menhera from "../src";

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test: ({ _val }) => console.log(_val)
          }
        }
      }
    }
  },
  foo: {
    bar: {
      foo1: {
        bar1: {
          test: "foo bar"
        }
      }
    }
  }
});
