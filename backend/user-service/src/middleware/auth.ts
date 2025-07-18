import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";

import UserModel, { UserType } from "../user-model";

export interface CartItem {
  product: string;
  productId: string;
  quantity: number;
  price: number;
}

interface CustomSession extends Session {
  uid?: string;
  cart?: CartItem[];
}

export interface CustomRequest extends Request {
  session: CustomSession;
  user?: UserType;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.session?.uid;
    if (!uid) return res.status(401).send("No user id");
    const user = await UserModel.findById(uid);
    if (!user) return res.status(401).send("No user found");
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default authMiddleware;
