import { getChannel } from "./rabbitmq";
import { NotificationType } from "../types";

export const sendNotificationMessage = async (
  notification: NotificationType
) => {
  const channel = await getChannel();
  try {
    await channel.assertQueue("notificationQueue", { durable: true });
    channel.sendToQueue(
      "notificationQueue",
      Buffer.from(JSON.stringify(notification)),
      {
        persistent: true,
      }
    );
    console.log("Notification message sent");
  } catch (error) {
    console.error("Failed to send notification message:", error);
  }
};
