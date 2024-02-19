import { Sequelize } from "sequelize";
import db from "./database.js";
import "dotenv/config.js";
const config = db[process.env.NODE_ENV];

export default new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: "postgres",
        logQueryParameters: true,
        benchmark: true
    }
);


