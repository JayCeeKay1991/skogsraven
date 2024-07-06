import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || "mongodb://127.0.0.1:27017/",
  dbNameInv: process.env.DB_NAME || "inventory",
  port: process.env.PORT || 3006,
  rabbitMqUrl: process.env.RABBIT_MQ_URL || "amqp://rabbitmq:5672",
};

export default config;
