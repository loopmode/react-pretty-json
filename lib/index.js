"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pojo = undefined;

var _pojo = require("./pojo");

Object.defineProperty(exports, "pojo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pojo).default;
  }
});

var _PrettyJson = require("./PrettyJson");

var _PrettyJson2 = _interopRequireDefault(_PrettyJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PrettyJson2.default;