import { connectRabbitMQ } from "./rabbitmq";
import { updateStock } from "../product-controller";

export const consumeProductMessage = async () => {
  const channel = await connectRabbitMQ();
  try {
    await channel.assertQueue("productQueue", { durable: true });
    channel.consume("productQueue", async (msg) => {
      if (msg !== null) {
        const stockUpdate = JSON.parse(msg.content.toString());
        await updateStock(stockUpdate);
        channel.ack(msg);
        console.log("Product updated and saved:", stockUpdate);
      }
    });
  } catch (error) {
    console.error("Failed to update stock:", error);
  }
};
