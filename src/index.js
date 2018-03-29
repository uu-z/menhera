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
  keywords: ["observer", "on"],
}
export * from "./plugins"

export default class Menhera {
  constructor(config) {
    this.struct = {}
    this.config = ConfigMerger(initConfig, config)
  }
  init() {
    const {
      components,
      keywords,
      lifeCycle
    } = this.config

    if (components) {
      components.forEach(async comp => {
        let struct = typeParser({
          obj: comp,
        })
        const {
          props: {
            name
          }
        } = struct
        this.struct[name] = struct
      })
    }

    Object.values(this.struct).forEach(struct => {
      const {
        events,
        events: {
          name
        },
        props,
      } = struct
      keywords.forEach(keyword => {
        if (props[keyword]) {
          for (const [key, value] of Object.entries(props[keyword])) {
            if (typeof this[keyword] == "function") {
              this[keyword].call(this, key, value)
            }
          }
        }
      })

      lifeCycle.forEach(key => {
        events[key] && events[key].call(this)
      })
    })
  }
}