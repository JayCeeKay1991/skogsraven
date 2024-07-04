import amqp from "amqplib";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    console.log("Connected to 🐇MQ");
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
}

export default connectRabbitMQ;
