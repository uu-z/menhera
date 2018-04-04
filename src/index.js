import { core } from "./menhera";

export * from "./plugins";

export default class Menhera {
  constructor(parms) {
    core({ _: this, parms });
  }
}
