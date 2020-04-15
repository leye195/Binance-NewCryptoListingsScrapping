"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractNewListing = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var URL = "https://binance.zendesk.com/hc/en-us/sections/115000106672-Avt79SXq?page=";

function delay(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}
/*Extract Total Number of Pages */


var extract_pages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var browser, page, pageTags, maxPage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer["default"].launch({
              headless: false
            });

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return browser.newPage();

          case 5:
            page = _context.sent;
            _context.next = 8;
            return page["goto"](URL, {
              waitUntil: "networkidle2"
            });

          case 8:
            _context.next = 10;
            return delay(2000);

          case 10:
            _context.next = 12;
            return page.$$eval("body > main > div.container > div > section > nav.pagination > ul>li>a", function (item) {
              return item.slice(0, item.length - 2).map(function (v) {
                return parseInt(v.textContent.trim(), 10);
              });
            });

          case 12:
            pageTags = _context.sent;
            maxPage = Math.max.apply(Math, _toConsumableArray(pageTags)); //공지사항 마지막 page 숫자
            //await extractNewListing(page,keyword);

            _context.next = 16;
            return page.close();

          case 16:
            _context.next = 18;
            return browser.close();

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function extract_pages() {
    return _ref.apply(this, arguments);
  };
}();

var extractNoticeDate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page, coinList) {
    var idx, coinListWithDate, noticeDate;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            idx = 0;
            coinListWithDate = [];

          case 2:
            if (!(idx < coinList.length)) {
              _context2.next = 18;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return page["goto"](coinList[idx].link, {
              waitUntil: "networkidle2"
            });

          case 6:
            _context2.next = 8;
            return page.$eval("#article-container > article > section.article-info > div > div.article-body > p:nth-last-child(11) > span", function (item) {
              return item.textContent;
            });

          case 8:
            noticeDate = _context2.sent;
            coinListWithDate.push({
              title: coinList[idx].title,
              link: coinList[idx].link,
              coin: coinList[idx].coin,
              updatedAt: noticeDate
            });
            idx++;
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0);

          case 16:
            _context2.next = 2;
            break;

          case 18:
            return _context2.abrupt("return", coinListWithDate);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 13]]);
  }));

  return function extractNoticeDate(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var extractNewListing = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(keyword) {
    var browser, page, articles, coinListing;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _puppeteer["default"].launch({
              headless: true
            });

          case 2:
            browser = _context3.sent;
            _context3.next = 5;
            return browser.newPage();

          case 5:
            page = _context3.sent;
            _context3.next = 8;
            return page.setExtraHTTPHeaders({
              "Accept-Language": "en-US,en;q=0.9"
            });

          case 8:
            _context3.next = 10;
            return page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");

          case 10:
            _context3.next = 12;
            return page["goto"]("".concat(URL, "1"), {
              waitUntil: "networkidle2"
            });

          case 12:
            _context3.next = 14;
            return delay(1000);

          case 14:
            _context3.next = 16;
            return page.$$eval("body > main > div.container > div > section > ul > li.article-list-item  > a.article-list-link", function (items) {
              return items.map(function (v) {
                return {
                  title: v.textContent.trim(),
                  link: v.href
                };
              });
            });

          case 16:
            articles = _context3.sent;
            coinListing = [];
            [].forEach.call(articles, function (item, keyword) {
              if (item.title.toLowerCase().includes(keyword)) {
                var coinSymbol = item.title.split(/(\([A-Z]+\) )/g); //코인 심볼 추출

                if (coinSymbol.length > 1) {
                  var symbol = coinSymbol[1].slice(1, coinSymbol[1].length - 2);
                  coinListing.push({
                    title: item.title,
                    link: item.link,
                    coin: symbol
                  });
                }
              }
            });
            _context3.next = 21;
            return extractNoticeDate(page, coinListing);

          case 21:
            coinListing = _context3.sent.sort(function (x, y) {
              return x.updatedAt > y.updatedAt ? -1 : 1;
            });
            _context3.next = 24;
            return page.close();

          case 24:
            _context3.next = 26;
            return browser.close();

          case 26:
            return _context3.abrupt("return", coinListing);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function extractNewListing(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.extractNewListing = extractNewListing;