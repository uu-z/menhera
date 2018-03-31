import { EventEmitter } from "events";
import { ConfigMerger } from "./utils";
import { Observer, Event } from "./plugins";

const initConfig = {
  components: [Observer, Event],
  lifeCycle: ["awake", "start"]
};

export * from "./plugins";

export default class Menhera {
  constructor(config) {
    this.components = {};
    this.config = ConfigMerger(initConfig, config);
  }
  init() {
    const _ = this;
    const { components = [], lifeCycle = [] } = _.config;
    const [awake, ...lifeCycles] = lifeCycle;

    components.forEach(async component => {
      let comp = typeof component === "function" ? component(_) : component;
      const { name } = comp;
      _.components[name] = comp;

      comp[awake] && (await comp[awake]());

      await Object.keys(comp).forEach(prop => {
        if (typeof _[prop] === "function") {
          for (const [name, value] of Object.entries(comp[prop])) {
            if (typeof value === "function") {
              _[prop]({ name, event: value });
            } else {
              _[prop]({ name, props: value });
            }
          }
        }
      });

      lifeCycles.forEach(key => {
        comp[key] && comp[key]();
      });
    });
  }
}
