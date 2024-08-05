import redisClient from "./redis-client";
import NotificationModel, { NotificationType } from "./notification-model";
import { Request, Response } from "express";

export const storeNotification = async (notification: NotificationType) => {
  const key = `notification:${notification.userId}:${notification.orderId}`;
  await redisClient.setEx(key, 3600, JSON.stringify(notification)); // 1 hour
  const newNotification = new NotificationModel(notification);
  await newNotification.save();
};

export const getNotificationsByUser = async (req: Request, res: Response) => {
  console.log("Fetching notifications for user:", req.params.userId);
  try {
    const userId = req.params.userId;
    const keys = await redisClient.keys(`notification:${userId}:*`);
    console.log("Redis keys:", keys);
    const notifications = [];

    for (const key of keys) {
      const notification = await redisClient.get(key);
      if (notification) notifications.push(JSON.parse(notification));
    }

    const dbNotifications = await NotificationModel.find({ userId }).sort({
      date: -1,
    });
    console.log("Database notifications:", dbNotifications);

    res.status(200).json(notifications.concat(dbNotifications));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
};
