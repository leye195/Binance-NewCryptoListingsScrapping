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

//let job = null;
var startSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //let rule = new schedule.RecurrenceRule();
            try {
              //job = schedule.scheduleJob("*/5 * * * * *", async () => {
              //스케쥴링 활용 실행 반복 사용자 임의 수정 가능

              /*const coinList = await extractNewListing("will list"); //원하는 키워드 입력
              [].forEach.call(coinList, async (item) => {
                const notice = await binanceNoticeModel.findOne({ title: item.title });
                if (!notice) {
                  await binanceNoticeModel.create({
                    title: item.title,
                    link: item.link,
                    coin: item.coin,
                    updatedAt: item.updatedAt,
                  });
                }
              });*/
              console.log("Scraping 진행");
              res.send("Scraping 시작"); //});
            } catch (e) {
              console.error(e); //job.cancel();

              next(e);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startSchedule(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.startSchedule = startSchedule;

var endSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //job.cancel();
            res.end();

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function endSchedule(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.endSchedule = endSchedule;