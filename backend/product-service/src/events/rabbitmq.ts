import amqp, { Channel } from "amqplib";
import config from "../config/config";

const rabbitMqUrl = config.rabbitMqUrl as string;
const retryInterval = 5000;
let channel: Channel;

export const connectRabbitMQ = async (): Promise<Channel> => {
  let attempt = 0;
  while (true) {
    try {
      const connection = await amqp.connect(rabbitMqUrl);
      channel = await connection.createChannel();
      console.log("Connected Product Service to RabbitMQ");
      return channel;
    } catch (err) {
      attempt++;
      console.error(
        `Failed to connect product service to RabbitMQ (attempt ${attempt}):`,
        err
      );
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }
};

export const getChannel = async (): Promise<Channel> => {
  if (!channel) {
    channel = await connectRabbitMQ();
  }
  return channel;
};

export const assertQueue = async (queueName: string) => {
  const ch = await getChannel();
  await ch.assertQueue(queueName, { durable: true });
};
