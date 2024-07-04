import express from "express";
import cors from "cors";
import router from "";
const port = 3003;
const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
