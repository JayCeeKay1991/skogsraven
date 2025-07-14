import { Request, Response } from "express";
import ProductModel, { ProductType } from "./product-model";
import redisClient from "./redis-client";

// storing in redis temporarily
export const storeProducts = async (products: ProductType[]) => {
  try {
    const key = "products:all";
    await redisClient.setEx(key, 86400, JSON.stringify(products)); // 24 hours
  } catch (err) {
    console.error("Error in caching products", err);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    // try redis first
    try {
      const prodFromRedis = await redisClient.get("products:all");
      if (prodFromRedis) {
        res.status(200).json(JSON.parse(prodFromRedis));
        return;
      }
    } catch (redisError) {
      console.log("Redis error, falling back to MongoDB:", redisError);
    }
    // if nothing is cached in redis, get from mongodb
    const products = await ProductModel.find();

    // and then cache in redis
    await storeProducts(products);

    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    res.json({
      error: "An unexpected error occurred while getting the products.",
    });
  }
};

export const updateStock = async (stockUpdate: {
  productId: string;
  quantity: number;
}): Promise<ProductType | null> => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: stockUpdate.productId },
      { $inc: { numAvailable: -stockUpdate.quantity } },
      { new: true }
    );

    // invalidate redis cache
    try {
      await redisClient.del("products:all");
    } catch (redisError) {
      console.log("Redis error, falling back to MongoDB:", redisError);
    }

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};
