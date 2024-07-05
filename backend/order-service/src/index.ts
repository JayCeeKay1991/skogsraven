import express from "express";
import cors from "cors";
const port = 3003;
const app = express();

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Order server listening on port ${port}`);
});
