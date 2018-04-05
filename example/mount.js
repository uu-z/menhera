import Menhera from "menhera";

const _data = {
  name: "data",
  _hooks: () => ({
    _data: ({ _key, _val, _cp }) => {
      const { helloWorld } = _val;
      console.log(helloWorld);
    }
  }),
  _data: {
    helloWorld: "hello World!"
  }
};

const _ = new Menhera({
  _mount: {
    foo: [_data]
  }
});
