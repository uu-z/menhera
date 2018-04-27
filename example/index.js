import Mhr, { HOOKS } from "../dist";

const test = ({ _val }) => console.log(_val);
const testFn = ({ _val }) => console.log(_val());
const testEach = ({ _val }) => {
  typeof _val === "function" && testFn({ _val });
  typeof _val !== "function" && test({ _val });
};
const testRoot = ({ _val }) => {
  for (let [key, val] of Object.entries(_val)) {
    testEach({ _val: val });
  }
};

Mhr.$use({
  _hooks: {
    "foo.bar.foo1.bar1": {
      $: testEach,
      _: testRoot,
      test,
      testFn
    }
  },
  "foo.bar.foo1.bar1": {
    test: "foo bar",
    testFn: () => "foo bar"
  }
});
