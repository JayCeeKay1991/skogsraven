import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  picture: String,
  shortDescription: String,
  description: String,
  price: Number,
  numAvailable: Number,
});

export type ProductType = InferSchemaType<typeof ProductSchema>;

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
