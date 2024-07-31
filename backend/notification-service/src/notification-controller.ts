import redisClient from "./redis-client";
import NotificationModel, { NotificationType } from "./notification-model";

export const storeNotification = async (notification: NotificationType) => {
  const key = `notification:${notification.userId}:${notification.orderId}`;
  await redisClient.setEx(key, 3600, JSON.stringify(notification)); // 1 hour
  const newNotification = new NotificationModel(notification);
  await newNotification.save();
};

export const getNotificationsByUser = async (userId: String) => {
  const keys = await redisClient.keys(`notification:${userId}:*`);
  const notifications = [];
  for (const key of keys) {
    const notification = await redisClient.get(key);
    if (notification) notifications.push(JSON.parse(notification));
  }
  const dbNotifications = await NotificationModel.find({ userId }).sort({
    date: -1,
  });
  return notifications.concat(dbNotifications);
};
