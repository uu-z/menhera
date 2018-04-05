import Menhera from "menhera";

const _data = {
  name: "data",
  _hooks: () => ({
    _data: ({ _key, _val, cp }) => {
      const { data } = _val;
      console.log(data);
    }
  })
};

const _ = new Menhera({
  _mount: {
    foo: [_data]
  },
  _data: {
    data: "foo"
  }
}).$use({
  _data: {
    data: "bar"
  }
});
