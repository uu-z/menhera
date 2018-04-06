import Menhera from "../src";

const test = ({ _val }) => console.log(_val);

const _ = new Menhera({
  _hooks: {
    data: {
      test1: test,
      test2: test
    }
  },
  data: {
    test1: "foo",
    test2: "bar"
  }
});
