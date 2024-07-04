import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_ROOT_URL || `mongodb://127.0.0.1:27017/`,
  dbNameUs: `${process.env.DB_NAME_US || "users"}`,
  port: process.env.PORT || 3001,
};

export default config;
