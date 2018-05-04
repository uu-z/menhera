const Mhr = require("../dist").default;

Mhr.$use({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            test: ({ _val }) => console.log(_val),
            testFn: ({ _val }) => console.log(_val())
          }
        }
      }
    }
  },
  "foo.bar.foo1.bar1": {
    test: "foo bar",
    testFn: () => "foo bar"
  }
});
