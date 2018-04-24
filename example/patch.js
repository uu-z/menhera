import Mhr, { $set } from "../dist";

let Test = {
  name: "test",
  _hooks: {
    test: () => {}
  }
};

let newTest = $set(Test, {
  name: "newTest",
  _hooks: {
    test: () => ({ _val }) => console.log(_val)
  }
});

Mhr.$use({
  _mount: {
    newTest
  },
  test: 123
});
