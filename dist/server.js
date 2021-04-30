"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
const { PORT } = process.env;
const server = express_1.default();
// ---- MIDDLEWARE --------
server.use(morgan_1.default("dev"));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use("/", router_1.default);
exports.default = server;
