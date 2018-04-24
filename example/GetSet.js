import mhr from "../dist";

mhr.$use({
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

mhr.$set({
  foo: {
    bar: {
      String: "123456",
      Boolean: false,
      Number: 123,
      Array: [1, 2, 3],
      Object: {
        1: 1,
        2: 2,
        3: 3
      },
      Function: ({ tar }) => val => val + 1
    }
  }
});

mhr.$use(
  mhr.$get({
    foo: {
      bar: {
        String: "",
        Boolean: ({ tar }) => !tar,
        Number: ({ tar }) => tar + 123333,
        Array: ({ tar }) => [...tar, ...[4, 5, 6]],
        Object: ({ tar }) => ({ ...tar, ...{ 4: 4, 5: 5, 6: 6 } }),
        Function: ({ tar }) => tar(123455)
      }
    }
  })
);
