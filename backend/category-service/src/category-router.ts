import express from "express";
import { getCategories } from "./category-controller";

const router = express.Router();

router.get("/category", getCategories);

export default router;
