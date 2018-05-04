import Mhr, { $set, $get } from "../dist";

let test = {};
$set(test, {
  foo: {
    bar: 1
  },
  "foo.dot": 2,
  "foo.slash": 3
});
console.log(test);

console.log(
  $get(test, {
    foo: {
      bar: ""
    },
    slash: "foo/dot",
    dot: "foo.slash"
  })
);
