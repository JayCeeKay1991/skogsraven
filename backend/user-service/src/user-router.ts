import express from "express";
import {
  createUser,
  login,
  logout,
  profile,
  getUserById,
  updateUser,
} from "./user-controller";
import {
  getCart,
  addToCart,
  removeFromCart,
  placeOrder,
} from "./cart-controller";
import authMiddleware from "./middleware/auth";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", createUser);
router.get("/user/:id", getUserById);
router.put("/user/:userId", updateUser);
// session
router.get("/user/me", authMiddleware, profile);
router.post("/user/logout", authMiddleware, logout);

// cart router
router.get("/user/cart", authMiddleware, getCart);
router.post("/user/cart/add", authMiddleware, addToCart);
router.post("/user/cart/remove", authMiddleware, removeFromCart);

// order interface
router.post("/order", authMiddleware, placeOrder);

export default router;
