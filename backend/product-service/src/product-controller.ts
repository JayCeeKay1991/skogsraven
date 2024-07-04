import { Request, Response } from "express";
import ProductModel, { ProductType } from "./product-model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body as ProductType;

    // Check if productData has the required fields
    if (productData && productData.name) {
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } else {
      res.status(400).json({ error: "Missing required product fields" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create product." });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: productId,
    });
    return deletedProduct;
  } catch (error) {
    console.error(error);
    return error;
  }
};
