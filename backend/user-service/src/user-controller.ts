import UserModel from "./user-model";
import { Response } from "express";
import { CustomRequest } from "./middleware/auth";
import bcrypt from "bcryptjs";

// signup
export const createUser = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("💚", email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // Check if the user already exists
    const userInDb = await UserModel.findOne({ email: email });
    if (userInDb)
      return res.status(409).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    console.log("😘", hash);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    console.log("🥰", newUser);

    const user = await newUser.save();

    // SESSION
    if (req.session) {
      req.session.uid = user._id.toString();
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // Find user by email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    // SESSION
    req.session.uid = user._id.toString();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error logging in user");
  }
};

// get user profile for the session
export const profile = async (req: CustomRequest, res: Response) => {
  try {
    res.status(200).send(req.user);
  } catch {
    res.status(500).send({ Error, message: "An unexpected error occured." });
  }
};

export const logout = (req: CustomRequest, res: Response) => {
  req.session &&
    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .send({ error, message: "Could not log out, please try again" });
      } else {
        res.clearCookie("sid");
        res.status(200).send({ message: "Logout successful" });
      }
    });
};
