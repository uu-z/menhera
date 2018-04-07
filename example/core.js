import { core } from "../src";

class Foo {
  constructor() {}
}

const _bar = parms => core({ _: new Foo(), parms });

const _ = new _bar({
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
