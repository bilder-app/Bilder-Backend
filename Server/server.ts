import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./router";

const { PORT } = process.env;

const server = express();

// ---- MIDDLEWARE --------

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", router);

export default server;
