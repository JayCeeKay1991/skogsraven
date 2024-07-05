import express from "express";
import cors from "cors";
const port = 3004;
const app = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Notification server listening on port ${port}`);
});
