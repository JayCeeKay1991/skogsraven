import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "./product-controller";

const router = express.Router();

router.get("/product", getProducts);
router.post("/product", createProduct);
router.put("/product/:id");
router.delete("/product/:id", deleteProduct);

export default router;
