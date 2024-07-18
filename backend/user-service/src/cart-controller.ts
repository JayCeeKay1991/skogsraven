import { Response } from "express";
import { CustomRequest } from "./middleware/auth";
import { CartItem } from "./middleware/auth";

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
