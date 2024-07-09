import { apiClient } from "./api-client";
import { CategoryType } from "../types/types";
const PORT = import.meta.env.PORT_CAT || 3005;

// Get categories
export const getCategories = async () => {
  return await apiClient<CategoryType[]>(PORT, "category");
};
