import { CartItemType } from "@/types/types";
import { apiClient } from "./api-client";

const PORT = import.meta.env.PORT_US || 3001;

export const getCart = async () => {
  try {
    return await apiClient<CartItemType[]>(PORT, "user/cart");
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (
  product: string,
  quantity: number
): Promise<CartItemType[]> => {
  return await apiClient<CartItemType[]>(PORT, "user/cart/add", "POST", {
    product,
    quantity,
  });
};

export const removeFromCart = async (
  product: string
): Promise<CartItemType[]> => {
  return await apiClient<CartItemType[]>(PORT, "user/cart/remove", "POST", {
    product,
  });
};
