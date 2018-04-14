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
          let vals = Array.isArray(_val) ? _val : [_val];
          vals.forEach(val => {
            for (let [k, v] of Object.entries(val)) {
              observe(() => v({ ...this.observable[_key] }));
            }
          });
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
      foo: {
        bar(val) {
          console.log(val);
        }
      }
    }
  }
});

_.Observer.observable.foo.bar++;
_.Observer.observable.foo.bar = 10;
_.Observer.observable.foo.foo = { bar: 100 };
