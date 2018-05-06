const Mhr = require("../dist").default;
const { HOOKS } = require("../dist");

Mhr.$use({
  _hooks: {
    foo: {
      bar: {
        test: ({ _val }) => console.log(_val),
        testFn: ({ _val }) => console.log(_val())
      }
    }
  },
  "foo.bar": {
    test: "foo bar",
    testFn: () => "foo bar"
  }
});
