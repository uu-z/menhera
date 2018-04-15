import Menhera from "../src";

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        $({ _key, _val }) {
          console.log(`${_key}: ${_val}`);
        }
      }
    }
  }
});

_.$set({
  foo: {
    bar: {
      test: 123
    }
  }
});

_.$use(
  _.$get({
    foo: {
      bar: {
        test: 233,
        test1: 456
      }
    }
  })
);
