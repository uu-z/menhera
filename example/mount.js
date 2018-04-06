import Menhera from "../src";

const test = ({ _val }) => console.log(_val);

const mount = {
  name: "mount",
  _hooks: {
    data: {
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
  }
};

const _ = new Menhera({
  _mount: {
    foo: [mount]
  }
}).$use({
  data: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test: "foo bar"
          }
        }
      }
    }
  }
});
