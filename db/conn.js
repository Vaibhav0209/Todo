import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const DB = process.env.DATABASE;
const ROOT = process.env.ROOT;
const HOST = process.env.HOST;
const connection = mysql.createConnection({
  host: HOST,
  user: ROOT,
  password: "",
  database: DB,
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

export default connection;
