import express from "express";
import { getProducts } from "./product-controller";

const router = express.Router();

router.get("/product", getProducts);

export default router;
