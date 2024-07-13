import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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

export type ProductType = InferSchemaType<typeof productSchema>;

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
