import express from "express";
import cors from "cors";
const port = 3006;
const app = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Inventory server listening on port ${port}`);
});
