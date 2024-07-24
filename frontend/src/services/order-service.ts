import { apiClient } from "./api-client";
import { OrderType } from "../types/types";
const PORT = import.meta.env.PORT_ORD || 3003;

export const getOrdersByUser = async (userId: string) => {
  try {
    return await apiClient<OrderType[]>(PORT, `order/${userId}`);
  } catch (error) {
    console.error(error);
  }
};
