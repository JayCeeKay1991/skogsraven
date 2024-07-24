import connectRabbitMQ from "./rabbitmq";
import { createOrder } from "../order-controller";

export const consumeOrderMessage = async () => {
  const channel = await connectRabbitMQ();
  try {
    await channel.assertQueue("orderQueue", { durable: true });
    channel.consume("orderQueue", async (msg) => {
      console.log("💚", msg);
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        await createOrder(order);
        channel.ack(msg);
        console.log("Order processed and saved:", order);
      }
    });
  } catch (error) {
    console.error("Failed to process order:", error);
  }
};
