"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endSchedule = exports.startSchedule = void 0;

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _binance = require("../binance");

var _binanceNoticeModel = _interopRequireDefault(require("../model/binanceNoticeModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var job = null;

var startSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //let rule = new schedule.RecurrenceRule();
            try {
              job = _nodeSchedule["default"].scheduleJob("*/5 * * * * *", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var coinList;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _binance.extractNewListing)("will list");

                      case 2:
                        coinList = _context2.sent;
                        //원하는 키워드 입력
                        [].forEach.call(coinList, /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                            var notice;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return _binanceNoticeModel["default"].findOne({
                                      title: item.title
                                    });

                                  case 2:
                                    notice = _context.sent;

                                    if (notice) {
                                      _context.next = 6;
                                      break;
                                    }

                                    _context.next = 6;
                                    return _binanceNoticeModel["default"].create({
                                      title: item.title,
                                      link: item.link,
                                      coin: item.coin,
                                      updatedAt: item.updatedAt
                                    });

                                  case 6:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x4) {
                            return _ref3.apply(this, arguments);
                          };
                        }());
                        console.log("Scraping 진행");

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              })));
              res.end();
            } catch (e) {
              console.error(e);
              job.cancel();
              next(e);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function startSchedule(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.startSchedule = startSchedule;

var endSchedule = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            job.cancel();
            res.end();

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function endSchedule(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.endSchedule = endSchedule;