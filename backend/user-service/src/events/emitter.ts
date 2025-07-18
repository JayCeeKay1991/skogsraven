import { getChannel } from "./rabbitmq";
import { OrderType } from "../types";

export const sendOrderMessage = async (order: OrderType) => {
  const channel = await getChannel();
  try {
    await channel.assertQueue("orderQueue", { durable: true });
    channel.sendToQueue("orderQueue", Buffer.from(JSON.stringify(order)), {
      persistent: true,
    });
    console.log("Order message sent");
  } catch (error) {
    console.error("Failed to send order message:", error);
  }
};
