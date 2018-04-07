import Menhera from "../src";

const mount = {
  name: "mount",
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
