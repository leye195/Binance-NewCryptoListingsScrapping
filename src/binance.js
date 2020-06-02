import puppeteer from "puppeteer-extra";
import stealth from "puppeteer-extra-plugin-stealth";
// add stealth plugin and use defaults (all evasion techniques)
import randomUser from "random-useragent";
import "@babel/polyfill";
const URL = "https://bitmeet.com/ko/exchanges/BINANCE/notice?page=1";
//"https://binance.zendesk.com/hc/en-us/sections/115000106672-Avt79SXq";
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

const extractNoticeDate = async (page, coinList) => {
  let idx = 0;
  const coinListWithDate = [];
  while (idx < coinList.length) {
    try {
      await page.goto(coinList[idx].link, { waitUntil: "networkidle2" });
      const noticeDate = await page.$eval(
        "#article-container > article > section.article-info > div > div.article-body > p:nth-last-child(11) > span",
        (item) => item.textContent
      );
      coinListWithDate.push({
        title: coinList[idx].title,
        link: coinList[idx].link,
        coin: coinList[idx].coin,
        updatedAt: noticeDate,
      });
      idx++;
    } catch (e) {
      console.error(e);
    }
  }
  return coinListWithDate;
};
export const extractNewListing = async () => {
  puppeteer.use(stealth());
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setExtraHTTPHeaders({
    "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
  );

  await page.goto(`${URL}`, { waitUntil: "networkidle2" });
  await delay(5000);

  const articles = await page.$$eval(
    "#exchanges_wrap > div.exchanges_body > div > div.post_list > div.inner > table > tbody > tr > td.subject_cell > a.subject",
    (items) =>
      items.map((item) => {
        const title = item.textContent.slice(2).trim(),
          link = item.href;
        if (title.includes("Will List")) {
          return { title, link, coin: true };
        } else
          return {
            title,
            link,
            coin: false,
          };
      })
  );
  //console.log(articles);
  let coinListing = [];
  [].forEach.call(articles, (item) => {
    if (item.coin === true) {
      const coinSymbol = item.title.split(/(\([A-Z]+\))/g); //코인 심볼 추출
      if (coinSymbol.length > 1) {
        const symbol = coinSymbol[1].slice(1, coinSymbol[1].length - 1);
        coinListing.push({ title: item.title, link: item.link, coin: symbol });
      }
    }
  });
  //console.log(coinListing);
  await page.close();
  await browser.close();
  return coinListing;
};
//extractNewListing();
