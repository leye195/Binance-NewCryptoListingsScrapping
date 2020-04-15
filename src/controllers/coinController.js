import schedule from "node-schedule";
import { extractNewListing } from "../binance";
import binanceNoticeModel from "../model/binanceNoticeModel";
//let job = null;
export const startSchedule = async (req, res, next) => {
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
    res.send("Scraping 시작");
    //});
  } catch (e) {
    console.error(e);
    //job.cancel();
    next(e);
  }
};
export const endSchedule = async (req, res, next) => {
  //job.cancel();
  res.end();
};
