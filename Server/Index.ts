import { Sequelize } from "sequelize-typescript";

const {
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
  NODE_ENV,
  DATABASE_URL
} = process.env as any;

let sequelize: Sequelize;

if (NODE_ENV !== "production") {
  sequelize = new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    models: [__dirname + "/Models"],
    logging: false
  });
} else {
  sequelize = new Sequelize(DATABASE_URL!, {
    dialect: "postgres",
    models: [__dirname + "/Models"],
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
}

export default sequelize;
