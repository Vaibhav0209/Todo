import express from "express";
const app = express();
import "./db/conn.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router/index.js";
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started at port 5000");
});
