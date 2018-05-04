import Mhr, { $set, $get } from "../dist";

let test = {};
$set(test, {
  "foo.dot": 123,
  "foo.slash": "foo/dot"
});
console.log(test);

console.log(
  $get(test, {
    dot: "foo.slash",
    slash: "foo/dot"
  })
);
