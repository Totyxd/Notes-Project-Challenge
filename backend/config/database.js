import "dotenv/config";

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: process.env.DB_PORT
  }
}
