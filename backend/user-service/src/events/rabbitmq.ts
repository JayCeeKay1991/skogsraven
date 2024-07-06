import amqp, { Channel } from "amqplib";
import config from "../config/config";

const rabbitMqUrl = config.rabbitMqUrl as string;
const retryInterval = 5000;
let channel: Channel;

async function connectRabbitMQ(): Promise<Channel> {
  let attempt = 0;
  while (true) {
    try {
      const connection = await amqp.connect(rabbitMqUrl);
      channel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
      return channel;
    } catch (err) {
      attempt++;
      console.error(
        `Failed to connect user service to RabbitMQ (attempt ${attempt}):`,
        err
      );
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }
}

async function initializeRabbitMQ() {
  const channel = await connectRabbitMQ();

  // Example of asserting a queue
  await channel.assertQueue("userQueue", { durable: false });

  // Example of consuming a message from a queue
  channel.consume("userQueue", (msg) => {
    if (msg !== null) {
      console.log("Received:", msg.content.toString());
      channel.ack(msg);
    }
  });
}

export { initializeRabbitMQ, channel };
