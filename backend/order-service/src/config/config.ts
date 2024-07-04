import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || `mongodb://127.0.0.1:27017/`,
  dbNameOrd: `${process.env.DB_NAME_ORD || "orders"}`,
  port: process.env.PORT || 3003,
};

export default config;
