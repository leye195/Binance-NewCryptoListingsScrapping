import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "./db";
import globalRoute from "./routes/globalRoute";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRoute);
app.listen(process.env.PORT, () => {
  console.log(`[Scrapping] Express is Running on Port:${process.env.PORT}`);
});
