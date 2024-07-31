import express from "express";
import {
  storeNotification,
  getNotificationsByUser,
} from "./notification-controller";

const router = express.Router();

router.post("notification/", storeNotification);
router.get("notification/:userId", getNotificationsByUser);

export default router;
