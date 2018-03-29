'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _utils = require('./utils');

var _plugins = require('./plugins');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initConfig = {
  components: [_plugins.Observer, _plugins.Event],
  lifeCycle: ["awake", "start"],
  keywords: ["observer", "on"]
};

var Menhera = function () {
  function Menhera(config) {
    _classCallCheck(this, Menhera);

    this.struct = {};
    this.config = (0, _utils.ConfigMerger)(initConfig, config);
  }

  _createClass(Menhera, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var _config = this.config,
          components = _config.components,
          keywords = _config.keywords,
          lifeCycle = _config.lifeCycle;


      if (components) {
        components.forEach(function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comp) {
            var struct, name;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    struct = (0, _utils.typeParser)({
                      obj: comp
                    });
                    name = struct.props.name;

                    _this.struct[name] = struct;

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }

      Object.values(this.struct).forEach(function (struct) {
        var events = struct.events,
            name = struct.events.name,
            props = struct.props;

        keywords.forEach(function (keyword) {
          if (props[keyword]) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Object.entries(props[keyword])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref2 = _step.value;

                var _ref3 = _slicedToArray(_ref2, 2);

                var key = _ref3[0];
                var value = _ref3[1];

                if (typeof _this[keyword] == "function") {
                  _this[keyword].call(_this, key, value);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        });

        lifeCycle.forEach(function (key) {
          events[key] && events[key].call(_this);
        });
      });
    }
  }]);

  return Menhera;
}();

exports.default = Menhera;