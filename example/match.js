import { $match, $str } from "../dist";

let obj = {
  loading: true,
  error: true,
  foo: {
    foo: 123,
    bar: 123
  }
};

let loading = $str({ equal: { loading: true }, get: { loading: "" } });
let error = $str({ valid: { error: "" }, get: { error: "" } });
let foobar = $str({
  equal: { foo: { bar: 123 } },
  get: { bar: "foo.bar" }
});

$match(obj, {
  [loading]: ({ loading }) => console.log("loading", loading),
  [error]: ({ error }) => console.log("error", error),
  [foobar]: ({ bar }) => console.log(bar)
});
