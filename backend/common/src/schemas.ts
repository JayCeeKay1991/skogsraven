import mongoose, { InferSchemaType } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

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

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
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
export type CategoryType = InferSchemaType<typeof CategorySchema>;
export type ProductType = InferSchemaType<typeof ProductSchema>;
export type UserType = InferSchemaType<typeof UserSchema>;
export const CategoryModel = mongoose.model("Category", CategorySchema);
export const ProductModel = mongoose.model("Product", ProductSchema);
export const UserModel = mongoose.model("User", UserSchema);
