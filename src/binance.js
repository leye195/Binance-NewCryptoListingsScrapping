import puppeteer from "puppeteer";
// add stealth plugin and use defaults (all evasion techniques)
import "@babel/polyfill";
const URL = "https://www.binance.com/en/support/announcement/c-48";
//"https://bitmeet.com/ko/exchanges/BINANCE/notice?page=1";

const extractSymbol = (title) => {
  let symbol = "";
  for (let i = 0; i < title.length; i++) {
    if (title.charCodeAt(i) >= 65 && title.charCodeAt(i) <= 90) {
      symbol += title.charAt(i);
    } else {
      if (symbol.length > 1) break;
      symbol = "";
    }
  }
  return symbol;
};

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
/*Extract Total Number of Pages */
const extract_pages = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2" });
  await delay(2000);
  const pageTags = await page.$$eval(
    "body > main > div.container > div > section > nav.pagination > ul>li>a",
    (item) =>
      item
        .slice(0, item.length - 2)
        .map((v) => parseInt(v.textContent.trim(), 10))
  );
  const maxPage = Math.max(...pageTags);
  //공지사항 마지막 page 숫자
  //await extractNewListing(page,keyword);
  await page.close();
  await browser.close();
};

export const extractNewListing = async () => {
  try {
    console.log("binance checking");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
    );
    await page.goto(`${URL}`, { waitUntil: "networkidle2" });
    await page.waitForSelector(
      "#__APP > div > div > div > div > div.css-deb3qh > div.css-1oz0ry0 > div.css-vurnku"
    );
    const listing = await page.$$eval(
      "#__APP > div > div > div > div > div.css-deb3qh > div.css-1oz0ry0 > div.css-vurnku > div.css-6f91y1 > div > a",
      (items) => {
        return items.map((item) => {
          const title = item.textContent.trim(),
            link = item.href;
          if (title.includes("Will List")) {
            return { title, link, coin: true };
          } else {
            return { title, link, coin: false };
          }
        });
      }
    );
    const coinList = [];
    [].forEach.call(listing, async (item) => {
      if (item.coin === true) {
        const symbol = extractSymbol(item.title); //코인 심볼 추출
        coinList;
      }
    });
    await page.close();
    await browser.close();
    return coinListing;
  } catch (e) {
    console.log(e);
  }
};
