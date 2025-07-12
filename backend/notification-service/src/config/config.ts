import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || `mongodb://127.0.0.1:27018/`,
  dbNameNot: process.env.DB_NAME || "notifications",
  port: process.env.PORT || 3004,
  rabbitMqUrl: process.env.RABBIT_MQ_URL || "amqp://rabbitmq:5672",
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: process.env.REDIS_PORT || 6379,
};

export default config;
