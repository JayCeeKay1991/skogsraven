import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  orderNumber: { type: String, required: true },
  date: Date,
  sumTotal: Number,
  deliveryFee: Number,
  status: String,
});

export type OrderType = InferSchemaType<typeof orderSchema>;

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
