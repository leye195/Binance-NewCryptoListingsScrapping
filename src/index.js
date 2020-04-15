import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "./db";
import globalRoute from "./routes/globalRoute";
import "@babel/polyfill";
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use("/", globalRoute);
app.listen(8787, () => {
  console.log("[Scrapping] Express is Running on Port:8787");
});
