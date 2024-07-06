import express from "express";
import { getUsers } from "./user-controller";

const router = express.Router();

router.get("/user", getUsers);
router.post("/user");
router.put("/user/:id");
router.delete("/user/:id");

export default router;
