import Mhr, { $set, $get } from "../dist";

let test = {};
$set(test, {
  "foo.dot": 123,
  "foo.slash": 456
});
console.log(test);

console.log(
  $get(test, {
    slash: "foo/dot",
    dot: "foo.slash"
  })
);
