import { Request, Response } from "express";
import { OrderType } from "./order-model";
import OrderModel from "./order-model";
import { sendNotificationMessage } from "./events/emitter";

export const createOrder = async (orderData: OrderType) => {
  try {
    if (!orderData) {
      throw new Error("Missing required order fields");
    }
    const newOrder = new OrderModel(orderData);
    await sendNotificationMessage({
      userId: newOrder.user,
      orderId: newOrder._id.toString(),
      message: "Your order was received.",
      date: new Date(),
      status: "unread",
    });
    return await newOrder.save();
  } catch (error) {
    console.error(
      error,
      "An unexpected error occurred while creating the order."
    );
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    res.json({
      error: "An unexpected error occurred while getting the orders.",
    });
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<OrderType | null> => {
  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: status } },
      { new: true }
    );
    if (updatedOrder) {
      await sendNotificationMessage({
        userId: updatedOrder.user,
        orderId: updatedOrder._id.toString(),
        message: `Your order status has changed to: ${status}.`,
        date: new Date(),
        status: "unread",
      });
    }
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await OrderModel.findOneAndDelete({
      _id: orderId,
    });
    res.status(204).json({ msg: "Order deleted" });
    return deletedOrder;
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while deleting the order",
    });
  }
};
