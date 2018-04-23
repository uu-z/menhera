import Menehra, { $set } from "../dist";

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

const _ = new Menehra({
  _mount: {
    newTest
  },
  test: 123
});
