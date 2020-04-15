"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _coinController = require("../controllers/coinController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _express["default"].Router();

app.get("/", _coinController.startSchedule);
app.get("/end", _coinController.endSchedule);
var _default = app;
exports["default"] = _default;