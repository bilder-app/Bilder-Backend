import { Sequelize } from "sequelize-typescript";

const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env as any;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  models: [__dirname + "/Models"],
  logging: false
});

export default sequelize;
