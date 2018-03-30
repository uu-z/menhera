import { EventEmitter } from "events";
import { keyParser, typeParser, ConfigMerger } from "./utils";
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
    const { components = [], lifeCycle } = _.config;
    const [awake, ...lifeCycles] = lifeCycle;

    components.forEach(async comp => {
      const { name } = comp;
      _.components[name] = comp;

      comp[awake] && (await comp[awake]({ _ }));

      await Object.keys(comp).forEach(prop => {
        if (typeof _[prop] === "function") {
          for (const [name, value] of Object.entries(comp[prop])) {
            if (typeof value === "function") {
              _[prop]({ _, name, event: value });
            } else {
              _[prop]({ _, name, props: value });
            }
          }
        }
      });

      lifeCycles.forEach(key => {
        comp[key] && comp[key]({ _ });
      });
    });
  }
}
