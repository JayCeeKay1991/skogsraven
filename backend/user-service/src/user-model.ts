import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

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

export type UserType = InferSchemaType<typeof UserSchema>;

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
