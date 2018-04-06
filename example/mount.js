import Menhera from "../src";

const test = ({ _val }) => console.log(_val);

const mount = {
  name: "mount",
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
  }
};

const _ = new Menhera({
  _mount: {
    foo: [mount]
  }
}).$use({
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
