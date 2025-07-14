import { Request, Response } from "express";
import CategoryModel, { CategoryType } from "./category-model";
import redisClient from "./redis-client";

// storing in redis temporarily
export const storeCategories = async (categories: CategoryType[]) => {
  try {
    const key = "categories:all";
    await redisClient.setEx(key, 86400, JSON.stringify(categories)); // 24 hours
  } catch (err) {
    console.error("Error in caching categories", err);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    // try redis first
    try {
      const catFromRedis = await redisClient.get("categories:all");
      if (catFromRedis) {
        res.status(200).json(JSON.parse(catFromRedis));
        return;
      }
    } catch (redisError) {
      console.log("Redis error, falling back to MongoDB:", redisError);
    }
    // if nothing is cached in redis, get from mongodb
    const categories = await CategoryModel.find();

    // and then cache in redis
    await storeCategories(categories);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500);
    res.json({
      error: "An unexpected error occurred while getting the categories.",
    });
  }
};

