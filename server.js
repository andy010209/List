import express from "express";
import listRouter from "./router/list.js";
import util from "util";
import mysql from "mysql";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
const port=3000;
dotenv.config();

export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: "",
    port: process.env.PORT,
    database: process.env.DATABASE,
  });

connection.connect();
export const query = util.promisify(connection.query).bind(connection);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("html", hbs.__express);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "myproject")));

app.get("/", (req, res) => {
  res.render("list.html");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/list", listRouter);
app.listen(port, () => console.log("Server is running"));