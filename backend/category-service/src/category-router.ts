import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "./category-controller";

const router = express.Router();

router.get("/category", getCategories);
router.post("/category", createCategory);
router.put("/category", updateCategory);
router.delete("/category", deleteCategory);

export default router;
