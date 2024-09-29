import { getChannel } from "./rabbitmq";
import { NotificationType, ProductMessageType } from "../types";

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

export const sendProductMessage = async (
  productMessage: ProductMessageType
) => {
  const channel = await getChannel();
  try {
    await channel.assertQueue("productQueue", { durable: true });
    channel.sendToQueue(
      "productQueue",
      Buffer.from(JSON.stringify(productMessage)),
      {
        persistent: true,
      }
    );
    console.log("Product message sent");
  } catch (error) {
    console.error("Failed to send product message:", error);
  }
};
