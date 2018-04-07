import { core } from "../src";

class Foo {
  constructor() {}
}

const Bar = parms => core({ _: new Foo(), parms });

const _ = new Bar({
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
