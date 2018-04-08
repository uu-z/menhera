import { core } from "../src";

class Foo {
  constructor() {}
}
const Bar = parms => core({ _: new Foo(), parms });

const _ = new Bar({});
