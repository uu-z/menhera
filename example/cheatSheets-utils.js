import { $set, $get, $merge, $diff, $has, $match, $str } from "../dist";

let _ = {};

let set = $set(_, [
  {
    foo: {
      bar: {
        String: "123456"
      }
    }
  },
  {
    foo: {
      bar: {
        number: 123456
      }
    }
  }
]);
console.log("$set: ", JSON.stringify(set));

let get = $get(_, [
  {
    foo: {
      bar: {
        String: ""
      }
    }
  },
  {
    foo: {
      bar: {
        number: 123456
      }
    }
  }
]);
console.log("$get: ", JSON.stringify(get));

let merge = $merge([
  {
    foo: {
      bar: {
        String: "123456"
      }
    }
  },
  {
    foo: {
      bar: {
        number: 123456
      }
    }
  }
]);
console.log("$merge: ", JSON.stringify(merge));

let diff = $diff(_, [
  {
    foo: {
      bar: {
        String: "0",
        number: 123456
      }
    }
  },
  {
    foo: {
      bar: {
        String: "123456",
        number: 0
      }
    }
  }
]);
console.log("$diff: ", JSON.stringify(diff));

let has = $has(_, {
  foo: {
    bar: {
      String: "",
      number: "",
      test: ""
    }
  }
});

console.log("$has: ", JSON.stringify(has));

let key = $str({
  equal: { "foo.bar.String": "123456" },
  get: { number: "foo.bar.number" }
});
let match = $match(_, {
  [key]: ({ number }) => console.log(number)
});
