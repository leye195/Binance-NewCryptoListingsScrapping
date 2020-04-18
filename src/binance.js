import puppeteer from "puppeteer";
import "@babel/polyfill";
const URL =
  "https://binance.zendesk.com/hc/en-us/sections/115000106672-Avt79SXq";
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
  const browser = await puppeteer.launch({
    headless: true,
    //args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  await page.goto(`${URL}`, { waitUntil: "networkidle2" });
  await delay(1000);
  const articles = await page.$$eval(
    "body > main > div.container > div > section > ul > li.article-list-item  > a.article-list-link",
    (items) =>
      items.map((v) => {
        return { title: v.textContent.trim(), link: v.href };
      })
  );
  let coinListing = [];
  [].forEach.call(articles, (item) => {
    //console.log(item.title, item.title.includes("Will List"));
    if (item.title.includes("Will List")) {
      const coinSymbol = item.title.split(/(\([A-Z]+\))/g); //코인 심볼 추출
      if (coinSymbol.length > 1) {
        const symbol = coinSymbol[1].slice(1, coinSymbol[1].length - 1);
        coinListing.push({ title: item.title, link: item.link, coin: symbol });
      }
    }
  });
  coinListing = (await extractNoticeDate(page, coinListing)).sort((x, y) => {
    return x.updatedAt > y.updatedAt ? -1 : 1;
  });
  //console.log(coinListing);
  await page.close();
  await browser.close();
  return coinListing;
};
