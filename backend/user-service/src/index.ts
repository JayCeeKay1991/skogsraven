import express from "express";
import { initializeRabbitMQ } from "./events/rabbitmq";
import cors from "cors";
import router from "./user-router";

const port = 3001;
const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

initializeRabbitMQ()
  .then(() => {
    app.listen(port, () => {
      console.log(`User service listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize RabbitMQ:", err);
  });
