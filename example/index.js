const Mhr = require("../dist").default;

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
