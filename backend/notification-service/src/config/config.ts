import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || `mongodb://127.0.0.1:27017/`,
  dbNameNot: `${process.env.DB_NAME_NOT || "notifications"}`,
  port: process.env.PORT || 3004,
};

export default config;
