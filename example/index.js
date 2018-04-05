import Menhera from "../src";

const _data = ({ _val }) => {
  const { data } = _val;
  console.log(data);
};

const _ = new Menhera({
  _hooks: () => ({
    _data
  }),
  _data: {
    data: "foo"
  }
}).$use({
  _data: {
    data: "bar"
  }
});
