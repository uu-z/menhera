import {
  EventEmitter
} from 'events'
import {
  keyParser,
  typeParser,
  ConfigMerger
} from './utils'
import {Observer, Event} from "./plugins"

const initConfig = {
  components: [Observer, Event],
  lifeCycle: ["awake", "start"],
  keywords: [],
}
export * from "./plugins"

export default class Menhera {
  constructor(config) {
    this.structs = {}
    this.config = ConfigMerger(initConfig, config)
  }
  init() {
    const {
      components,
      lifeCycle
    } = this.config
    const [awake, ...lifeCycles] = lifeCycle

    if (components) {
      components.forEach(comp => {
        let struct = typeParser({
          obj: comp,
        })
        const {
          props: {
            name,
            keywords=[]
          }
        } = struct
        this.structs[name] = struct
        this.config.keywords = this.config.keywords.concat(keywords)
      })
    }
    this.config.keywords = Array.from(new Set(this.config.keywords))
    
    Object.values(this.structs).forEach(struct => {
      const {
        events,
        events: {
          name
        },
        props,
      } = struct

      events[awake] && events[awake].call(this)

      this.config.keywords.forEach(keyword => {
        if (props[keyword]) {
          for (const [key, value] of Object.entries(props[keyword])) {
            if (typeof this[keyword] == "function") {
              this[keyword].call(this, key, value)
            }
          }
        }
      })

      lifeCycles.forEach(key => {
        events[key] && events[key].call(this)
      })
    })
  }
}