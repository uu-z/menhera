import Menehra from "../src";
import { observable, observe } from "@nx-js/observer-util";

const Observer = {
  name: "Observer",
  observable: {},
  _hooks: {
    Observer: {
      observable: {
        $({ _key, _val }) {
          this.observable[_key] = observable(_val);
        }
      },
      observe: {
        $({ _key, _val }) {
          observe(() => _val({ ...this.observable[_key] }));
        }
      }
    }
  }
};

const _ = new Menehra({
  _mount: {
    Observer
  },
  Observer: {
    observable: {
      foo: {
        bar: 0
      }
    },
    observe: {
      foo(val) {
        console.log(val);
      }
    }
  }
});
const { Observer: { observable: { foo } } } = _;

foo.bar++;
foo.bar = 10;
foo.foo = { bar: 100 };
