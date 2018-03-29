import {
    EventEmitter
} from 'events'

export const Observer = {
    name: "observer",
    awake() {

        this.Observer = new EventEmitter
        this.state = {}
        this._state = {}
        let _this = this
        this.state = new Proxy(this._state, {
            get(target, key) {
                if (key in target) {
                    return target[key]
                } else {
                    target[key] = null;
                    return null
                }
            },
            set(target, key, val) {
                target[key] = val
                _this.Observer.emit(key, val)
                return true
            }
        })
        this.observer = (name, fn) => {
            _this.Observer.on(name, fn)
        }
    },

}

export const Event = {
    name: "event",
    awake() {
        this.Event = new EventEmitter
        this.on = (name, fn) => {
            this.Event.on(name, fn)
            return this
        }

        this.emit = (name, ...args) => {
            this.Event.emit(name, ...args)
            return this
        }
    }
}