import cron from "node-cron";
import OrderModel from "./order-model";
import { updateOrderStatus } from "./order-controller";

const updateOrdersJob = async () => {
  try {
    const orders = await OrderModel.find({ status: "Received" });
    for (const order of orders) {
      await updateOrderStatus(order._id.toString(), "In progress");
    }

    console.log("Orders updated and notifications sent");
  } catch (error) {
    console.error("Error updating orders:", error);
  }
};

cron.schedule("0 0 * * * ", updateOrdersJob);

export default updateOrdersJob;
