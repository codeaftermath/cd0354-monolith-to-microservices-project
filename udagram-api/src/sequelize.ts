import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";
import { requireAuth } from "./controllers/v0/feed/routes/feed.router";

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,

  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  storage: ":memory:",
});
