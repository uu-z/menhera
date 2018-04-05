import Menhera from "../src";

const _data = ({ _key, _val, _cp }) => {
  const { helloWorld } = _val;
  console.log(helloWorld);
};

const _ = new Menhera({
  _hooks: () => ({
    _data
  }),
  _data: {
    helloWorld: "hello World"
  }
}).$use({
  _command: {
    run: true
  }
});
