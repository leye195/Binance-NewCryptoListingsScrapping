import schedule from "node-schedule";
import { extractBinanceNewCryptoNotice } from "./binance";

let job = undefined;
const startJob = () => {
  console.log("Scraping 시작");
  try {
    job = schedule.scheduleJob("*/10 * * * * *", async () => {
      //스케쥴링 활용 실행 반복 사용자 임의 수정 가능
      console.log("Scraping 진행중");
      extractBinanceNewCryptoNotice();
    });
  } catch (e) {
    console.error(e);
    job.cancel();
  }
};
startJob();
