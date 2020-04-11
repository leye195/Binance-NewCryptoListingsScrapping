import schedule from "node-schedule";
import { extractNewListing } from "../binance";
import binanceNoticeModel from "../model/binanceNoticeModel";
let job = null;
export const startSchedule = async (req, res, next) => {
  //let rule = new schedule.RecurrenceRule();
  try {
    job = schedule.scheduleJob("*/5 * * * * *", async () => {
      const coinList = await extractNewListing();
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
      });
      console.log("Scraping 진행");
    });
    res.end();
  } catch (e) {
    console.error(e);
    job.cancel();
    next(e);
  }
};
export const endSchedule = async (req, res, next) => {
  job.cancel();
  res.end();
};
