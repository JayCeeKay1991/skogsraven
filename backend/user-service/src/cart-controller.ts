import { Response } from "express";
import { CustomRequest } from "./middleware/auth";
import { CartItem } from "./middleware/auth";
import { sendOrderMessage } from "./events/emitter";
import { OrderType } from "./types";

export const addToCart = (req: CustomRequest, res: Response) => {
  const { productId, product, quantity, price } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const existingItem = req.session.cart.find(
    (item: CartItem) => item.productId === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ product, productId, quantity, price });
  }
  res.status(200).json(req.session.cart);
};

export const getCart = (req: CustomRequest, res: Response) => {
  res.status(200).send(req.session.cart || []);
};

export const removeFromCart = (req: CustomRequest, res: Response) => {
  const { productId } = req.body;
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(
      (item: CartItem) => item.productId !== productId
    );
  }
  res.status(200).json(req.session.cart);
};

export const placeOrder = async (req: CustomRequest, res: Response) => {
  try {
    const cart = req.session.cart;
    const user = req.session.uid;

    if (!cart) {
      return res.status(400).send("Cart is empty");
    }
    if (!user) {
      return res.status(400).send("No user!");
    }

    const sumTotal = cart.reduce((acc: number, cartItem) => {
      return (acc += cartItem.price * cartItem.quantity);
    }, 0);

    const order: Omit<OrderType, "_id"> = {
      user: user,
      products: cart,
      date: new Date(),
      sumTotal: sumTotal,
      deliveryFee: 4.99,
      status: "Received",
    };

    await sendOrderMessage(order);
    req.session.cart = [];
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};
