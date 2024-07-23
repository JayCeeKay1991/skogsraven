import express from "express";
import cors from "cors";
import router from "./order-router";
import mongoose from "mongoose";
import config from "./config/config";

const port = config.port;
const dbUrl = `${config.dbUrl}${config.dbNameOrd}`;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Order database successfully connected to server 🚀");

    app.listen(port, () => {
      console.log(`Order server listening on port ${port}`);
    });
  } catch (error) {
    console.log("🔥 Error in the order database connection.", error);
  }
}
main();

export default mongoose;
