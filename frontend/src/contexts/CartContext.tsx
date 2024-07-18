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

type CartContextType = {
  cart: CartItemType[];
  setCart: Dispatch<SetStateAction<CartItemType[]>>;
  addItem: (product: string, quantity: number) => void;
  removeItem: (product: string) => void;
};

const initialCartContext: CartContextType = {
  cart: [],
  setCart: () => {},
  addItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext<CartContextType>(initialCartContext);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const checkCart = async () => {
      const cart = await getCart();
      if (cart) setCart(cart);
    };
    checkCart();
  }, []);

  const addItem = async (product: string, quantity: number) => {
    const updatedCart = await addToCart(product, quantity);
    setCart(updatedCart);
  };

  const removeItem = async (product: string) => {
    const updatedCart = await removeFromCart(product);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
