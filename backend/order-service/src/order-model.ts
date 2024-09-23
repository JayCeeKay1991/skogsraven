import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: Date,
  sumTotal: Number,
  deliveryFee: Number,
  status: String,
  products: [
    {
      productId: String,
      product: String,
      quantity: Number,
      price: Number,
    },
  ],
  shippingAddress: {
    name: String,
    street: String,
    zipCode: String,
    city: String,
    country: String,
  },
  billingAddress: {
    name: String,
    street: String,
    zipCode: String,
    city: String,
    country: String,
  },
});

export type OrderType = InferSchemaType<typeof orderSchema>;

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
