import amqp from "amqplib";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    console.log("Category service connected to 🐇MQ");
    return channel;
  } catch (error) {
    console.error("Failed to connect category service to RabbitMQ", error);
    throw error;
  }
}

export default connectRabbitMQ;
