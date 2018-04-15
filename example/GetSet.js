import Menhera from "../src";

const _ = new Menhera({
  _hooks: {
    foo: {
      bar: {
        $({ _key, _val }) {
          console.log(`${_key}: ${JSON.stringify(_val)}`);
        }
      }
    }
  }
});

_.$set({
  foo: {
    bar: {
      String: "123456",
      Number: 123,
      Array: [1, 2, 3],
      Object: {
        1: 1,
        2: 2,
        3: 3
      }
    }
  }
});

_.$use(
  _.$get({
    foo: {
      bar: {
        String: "",
        Number: ({ tar }) => tar + 123333,
        Array: ({ tar }) => [...tar, ...[4, 5, 6]],
        Object: ({ tar }) => ({ ...tar, ...{ 4: 4, 5: 5, 6: 6 } })
      }
    }
  })
);
