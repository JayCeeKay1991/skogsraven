import { apiClient } from "./api-client";
import { OrderType } from "../types/types";
const PORT = import.meta.env.PORT_ORD || 3003;

export const getOrdersByUser = async (userId: string) => {
  return await apiClient<OrderType[]>(PORT, `order/${userId}`);
};
