"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Event = exports.Observer = undefined;

var _events = require("events");

var Observer = exports.Observer = {
    name: "observer",
    awake: function awake() {
        this.Observer = new _events.EventEmitter();
        this.state = {};
        this._state = {};
        var _this = this;
        this.state = new Proxy(this._state, {
            get: function get(target, key) {
                if (key in target) {
                    return target[key];
                } else {
                    target[key] = null;
                    return null;
                }
            },
            set: function set(target, key, val) {
                target[key] = val;
                _this.Observer.emit(key, val);
                return true;
            }
        });
        this.observer = function (name, fn) {
            _this.Observer.on(name, fn);
        };
    }
};

var Event = exports.Event = {
    name: "event",
    awake: function awake() {
        var _this2 = this;

        this.Event = new _events.EventEmitter();
        this.on = function (name, fn) {
            _this2.Event.on(name, fn);
            return _this2;
        };

        this.emit = function (name) {
            var _Event;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            (_Event = _this2.Event).emit.apply(_Event, [name].concat(args));
            return _this2;
        };
    }
};