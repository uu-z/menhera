import { $core, $get, $set, $use, $ } from "../dist";

class Foo {
  constructor(object) {
    $core(this, object);
  }
}

const _ = new Foo({
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

let a = $set(
  _,
  {
    foo: {
      bar: {
        String: "123",
        Number: 123,
        Array: ({ tar = [1, 2, 3] }) => tar,
        Object: ({ tar }) => ({
          1: 1,
          2: 2,
          3: 3
        })
      }
    }
  },
  { type: "advanced" }
);

$use(_, a);
