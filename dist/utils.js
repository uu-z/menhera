"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var keyParser = function keyParser() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var obj = _ref.obj,
      _ref$struct = _ref.struct,
      struct = _ref$struct === undefined ? {} : _ref$struct,
      other = _objectWithoutProperties(_ref, ["obj", "struct"]);

  Object.keys(other).forEach(function (key) {
    if (Array.isArray(other[key])) {
      if (!struct[key]) {
        struct[key] = {};
      }

      other[key].forEach(function (keyword) {
        struct[key][keyword] = obj[keyword];
      });
    }
  });
  return struct;
};

exports.keyParser = keyParser;
var typeParser = exports.typeParser = function typeParser() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      obj = _ref2.obj,
      _ref2$struct = _ref2.struct,
      struct = _ref2$struct === undefined ? {} : _ref2$struct;

  struct = _extends({}, struct, { props: {}, events: {} });
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'function') {
      struct["events"][key] = obj[key];
    } else {
      struct["props"][key] = obj[key];
    }
  });
  return struct;
};

var ConfigMerger = exports.ConfigMerger = function ConfigMerger(Obj1, Obj2) {
  var cache = Obj1;
  Object.keys(Obj2).forEach(function (key) {
    cache[key] = [].concat(_toConsumableArray(Obj1[key] || []), _toConsumableArray(Obj2[key]));
  });
  return cache;
};