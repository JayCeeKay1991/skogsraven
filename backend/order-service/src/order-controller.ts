import { Request, Response } from "express";
import { OrderType } from "./order-model";
import OrderModel from "./order-model";

export const createOrder = async (orderData: OrderType) => {
  try {
    if (!orderData) {
      throw new Error("Missing required order fields");
    }
    const newOrder = new OrderModel(orderData);
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

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body as OrderType;
    const orderId = req.params.id;
    if (orderData) {
      const updatedOrder = OrderModel.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            status: orderData.status,
            deliveryFee: orderData.deliveryFee,
            sumTotal: orderData.sumTotal,
          },
        },
        { new: true }
      );
      res.status(201).send(updatedOrder);
    }
  } catch (error) {
    res.status(500);
    res.json({
      error: "An unexpected error occurred while editing the order.",
    });
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
