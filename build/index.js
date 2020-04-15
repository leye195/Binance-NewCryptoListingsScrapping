"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

require("./db");

var _globalRoute = _interopRequireDefault(require("./routes/globalRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use("/", _globalRoute["default"]);
app.listen(8787, function () {
  console.log("[Scrapping] Express is Running on Port:8787");
});