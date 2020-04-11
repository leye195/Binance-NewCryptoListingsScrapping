import mongoose from "mongoose";
const binanceNoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  coin: {
    type: String,
    required: "coin is required",
  },
  link: {
    type: String,
    required: "link is required",
  },
  updatedAt: {
    type: String,
    required: "updatedAt is required",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const binanceNoticeModel = mongoose.model("BinanceNotice", binanceNoticeSchema);
export default binanceNoticeModel;
