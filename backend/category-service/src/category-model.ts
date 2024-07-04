import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export type CategoryType = InferSchemaType<typeof categorySchema>;

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
