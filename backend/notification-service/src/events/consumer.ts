import { connectRabbitMQ } from "./rabbitmq";
import { storeNotification } from "../notification-controller";

export const consumeOrderMessage = async () => {
  const channel = await connectRabbitMQ();
  try {
    await channel.assertQueue("notificationQueue", { durable: true });
    channel.consume("notificationQueue", async (msg) => {
      console.log("💚", msg);
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());
        await storeNotification(notification);
        channel.ack(msg);
        console.log("Notification stored:", notification);
      }
    });
  } catch (error) {
    console.error("Failed to store notification:", error);
  }
};
