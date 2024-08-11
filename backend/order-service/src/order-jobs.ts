import cron from "node-cron";
import OrderModel from "./order-model";
import { updateOrderStatus } from "./order-controller";

const updateOrdersJob = async () => {
  try {
    const recievedOrders = await OrderModel.find({ status: "Received" });
    for (const order of recievedOrders) {
      await updateOrderStatus(order._id.toString(), "In progress");
    }

    const ordersInProgress = await OrderModel.find({ status: "In progress" });
    for (const order of ordersInProgress) {
      await updateOrderStatus(order._id.toString(), "Shipped");
    }

    const shippedOrders = await OrderModel.find({ status: "Shipped" });
    for (const order of shippedOrders) {
      await updateOrderStatus(order._id.toString(), "Completed");
    }

    console.log("Orders updated and notifications sent");
  } catch (error) {
    console.error("Error updating orders:", error);
  }
};

cron.schedule("0 0 */3 * * ", updateOrdersJob);

export default updateOrdersJob;
