import { createClient } from "redis";
import config from "./config/config";

const redisClient = createClient({
  socket: {
    host: config.redisHost,
    port: +config.redisPort,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis error in category service:", err);
});

redisClient.on("connect", () => {
  console.log("Connected category service to Redis 🎉");
});

redisClient.connect();

export default redisClient;
