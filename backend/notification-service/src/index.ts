import express from "express";
import cors from "cors";
import router from "./notification-router";
import mongoose from "mongoose";
import config from "./config/config";
import { connectRabbitMQ } from "./events/rabbitmq";
import { consumeOrderMessage } from "./events/consumer";

const port = config.port;
const dbUrl = config.dbUrl;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

connectRabbitMQ()
  .then(async () => {
    await mongoose.connect(`${dbUrl}${config.dbNameNot}`);
    console.log("Notification database successfully connected to server 🚀");
    consumeOrderMessage();
    app.listen(port, () => {
      console.log(`Notification service listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize RabbitMQ for notifications:", err);
  });

export default mongoose;
