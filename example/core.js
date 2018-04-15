import { $core, $get, $set, $use } from "../src";

class Foo {
  constructor() {}
}
const Bar = _object => $core({ _: new Foo(), _object });

const _ = new Bar({
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

let a = $set({
  _,
  _object: {
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
  }
});

$use({ _, _object: a });
