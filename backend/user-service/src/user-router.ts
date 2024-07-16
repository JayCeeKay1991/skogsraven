import express from "express";
import {
  createUser,
  login,
  logout,
  profile,
  getUserById,
} from "./user-controller";
import authMiddleware from "./middleware/auth";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", createUser);
router.get("/user/:id", getUserById);
// session
router.get("/user/me", authMiddleware, profile);
router.post("/user/logout", authMiddleware, logout);

export default router;
