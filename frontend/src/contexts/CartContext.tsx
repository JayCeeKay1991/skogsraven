import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react";
import { CartItemType } from "@/types/types";
import { getCart, addToCart, removeFromCart } from "../services/cart-service";
import { useAuthContext } from "./AuthContext";

type CartContextType = {
  cart: CartItemType[];
  setCart: Dispatch<SetStateAction<CartItemType[]>>;
  addItem: (
    productId: string,
    product: string,
    quantity: number,
    price: number
  ) => void;
  removeItem: (productId: string) => void;
  emptyCart: () => void;
};

const initialCartContext: CartContextType = {
  cart: [],
  setCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext<CartContextType>(initialCartContext);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user._id) {
      const checkCart = async () => {
        const cart = await getCart();
        if (cart) setCart(cart);
      };
      checkCart();
    }
  }, []);

  const addItem = async (
    productId: string,
    product: string,
    quantity: number,
    price: number
  ) => {
    const updatedCart = await addToCart(productId, product, quantity, price);
    setCart(updatedCart);
  };

  const removeItem = async (productId: string) => {
    const updatedCart = await removeFromCart(productId);
    setCart(updatedCart);
  };

  const emptyCart = async () => {
    for (const item of cart) {
      await removeFromCart(item.productId);
    }
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addItem, removeItem, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
