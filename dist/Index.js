"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;
const sequelize = new sequelize_typescript_1.Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    models: [__dirname + "/Models"],
    logging: false
});
exports.default = sequelize;
