import express from "express";
import { initializeRabbitMQ } from "./events/rabbitmq";
import cors from "cors";
import router from "./user-router";
import session from "express-session";

const port = 3001;
const secret = process.env.USERSECRET || "not the secret";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

app.use(
  session({
    name: "sid",
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

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
