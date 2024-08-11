import express from "express";

import { createOrder, getOrdersByUser, deleteOrder } from "./order-controller";

const router = express.Router();

router.get("/order/:userId", getOrdersByUser);
router.post("/order", createOrder);
router.delete("/order", deleteOrder);

export default router;
