import express from "express";
import {
  storeNotification,
  getNotificationsByUser,
  updateNotification,
} from "./notification-controller";

const router = express.Router();

router.post("/notification/", storeNotification);
router.get("/notification/:userId", getNotificationsByUser);
router.put("/notification/:notificationId", updateNotification);

export default router;
