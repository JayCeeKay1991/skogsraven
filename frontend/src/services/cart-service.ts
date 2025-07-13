import { CartItemType, OrderType } from "../types/types";
import { apiClient } from "./api-client";

const PORT = import.meta.env.PORT_US || 3001;

export const getCart = async () => {
  return await apiClient<CartItemType[]>(PORT, "user/cart");
};

export const addToCart = async (
  productId: string,
  product: string,
  quantity: number,
  price: number
): Promise<CartItemType[]> => {
  return await apiClient<CartItemType[]>(PORT, "user/cart/add", "POST", {
    product,
    productId,
    quantity,
    price,
  });
};

export const removeFromCart = async (
  productId: string
): Promise<CartItemType[]> => {
  return await apiClient<CartItemType[]>(PORT, "user/cart/remove", "POST", {
    productId,
  });
};

export const placeOrder = async (
  addressData: Partial<OrderType>
): Promise<{ message: string }> => {
  return await apiClient<{ message: string }>(
    PORT,
    "order",
    "POST",
    addressData
  );
};
