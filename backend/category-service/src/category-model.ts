import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export type CategoryType = InferSchemaType<typeof CategorySchema>;

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
