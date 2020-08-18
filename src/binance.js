import axios from "axios";
import cheerio from "cheerio";
import moment from "moment";

export const extractBinanceNewCryptoNotice = async (ip) => {
  try {
    const { data } = await axios.get(
      "https://www.binance.com/en/support/announcement"
    );
    const $ = cheerio.load(data);
    const {
      routeProps: {
        fca4: { catalogs },
      },
    } = JSON.parse($("#__APP_DATA").text());
    const newListings = catalogs.filter(
      (catalog) => catalog.catalogName === "New Crypto Listings"
    )[0];
    const articles = newListings.articles;
    for (let i = 0; i < articles.length; i++) {
      const title = articles[i].title;
      const link = `https://www.binance.com/en/support/announcement/${articles[i].code}`;
      const timeResponse = await axios.get(link);
      const $time = cheerio.load(timeResponse.data);
      const time = moment($time(".css-f1q2g4").text()).add("9", "h");
      console.log(`Title:${title}\nTime:${time}`);

      //DB에 정보 저장 중복 방지 코드 작성
    }
  } catch (e) {
    console.log(e);
  }
};
