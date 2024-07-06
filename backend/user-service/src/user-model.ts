import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof UserSchema>;

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
