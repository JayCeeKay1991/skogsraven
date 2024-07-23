import express from "express";

import {
  createOrder,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
} from "./order-controller";

const router = express.Router();

router.get("/order/:userId", getOrdersByUser);
router.post("/order", createOrder);
router.put("/order", updateOrder);
router.delete("/order", deleteOrder);

export default router;
