import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || `mongodb://127.0.0.1:27017/`,
  dbNameProd: `${process.env.DB_NAME_PROD || "categories"}`,
  port: process.env.PORT || 3005,
};

export default config;
