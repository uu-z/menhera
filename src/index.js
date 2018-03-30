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
    this.structs = {};
    this.config = ConfigMerger(initConfig, config);
  }
  init() {
    const { components = [], lifeCycle } = this.config;
    const [awake, ...lifeCycles] = lifeCycle;

    components.forEach(comp => {
      let struct = typeParser({
        obj: comp
      });
      const { props: { name }, events } = struct;
      this.structs[name] = struct;
      events[awake] && events[awake].call(this);
    });

    Object.values(this.structs).forEach(struct => {
      const { props, events } = struct;

      Object.keys(props).forEach(prop => {
        if (typeof this[prop] === "function") {
          for (const [key, value] of Object.entries(props[prop])) {
            this[prop].call(this, key, value);
          }
        }
      });

      lifeCycles.forEach(key => {
        events[key] && events[key].call(this);
      });
    });
  }
}
