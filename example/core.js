import { core } from "../src";

class Foo {
  constructor() {}
}
const Bar = _object => core({ _: new Foo(), _object });

const _ = new Bar({});
