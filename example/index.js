import Menhera from "../src";

const test = ({ _val }) => console.log(_val);

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test
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
