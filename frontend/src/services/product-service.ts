import { apiClient } from "./api-client";
import { ProductType } from "../types/types";
const PORT = import.meta.env.PORT_PROD || 3002;

// Get products by category
export const getProducts = async () => {
  return await apiClient<ProductType[]>(PORT, "product");
};
