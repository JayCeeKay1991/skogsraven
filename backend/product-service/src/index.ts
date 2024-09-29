import express from "express";
import cors from "cors";
import router from "./product-router";
import mongoose from "mongoose";
import config from "./config/config";
import { connectRabbitMQ } from "./events/rabbitmq";
import { consumeProductMessage } from "./events/consumer";

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
    await mongoose.connect(`${dbUrl}${config.dbNameProd}`);
    console.log("Product database successfully connected to server 🚀");
    consumeProductMessage();
    app.listen(port, () => {
      console.log(`Product service listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize RabbitMQ for products:", err);
  });

export default mongoose;
