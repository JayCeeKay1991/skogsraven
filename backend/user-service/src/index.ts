import express from "express";
import { connectRabbitMQ } from "./events/rabbitmq";

import cors from "cors";
import router from "./user-router";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./config/config";
import mongoose from "mongoose";

const port = config.port;
const secret = process.env.USERSECRET || "not the secret";
const dbUrl = config.dbUrl;
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
    store: MongoStore.create({
      mongoUrl: `${dbUrl}${config.dbNameUs}`,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: "lax",
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(express.json());

app.use(router);

connectRabbitMQ()
  .then(async () => {
    await mongoose.connect(`${dbUrl}${config.dbNameUs}`);
    console.log("User database successfully connected to server 🚀");
    app.listen(port, () => {
      console.log(`User service listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize RabbitMQ for users:", err);
  });
