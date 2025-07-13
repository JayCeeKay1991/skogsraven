import { Request, Response } from "express";
import CategoryModel, { CategoryType } from "./category-model";
import redisClient from "./redis-client";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body as CategoryType;

    // Check if categoryData has the required fields
    if (categoryData && categoryData.name) {
      const newCategory = new CategoryModel(categoryData);
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } else {
      res.status(400).json({ error: "Missing required category fields" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An unexpected error occurred while creating the category.",
    });
  }
};

// storing in redis temporarily
export const storeCategories = async (categories: CategoryType[]) => {
  try {
    const key = `categories:all`;
    await redisClient.setEx(key, 86400, JSON.stringify(categories)); // 24 hours
    console.log("👉 stored categories in redis!");
  } catch (err) {
    console.error("Error in caching categories", err);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    // try redis first
    try {
      const catFromredis = await redisClient.get(`categories:all`);
      if (catFromredis) {
        res.status(200).json(JSON.parse(catFromredis));
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body as CategoryType;
    const categoryId = req.params.id;
    if (categoryData && categoryData.name) {
      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: categoryId },
        {
          $set: {
            name: categoryData.name,
          },
        },
        { new: true }
      );
      res.status(201).json(updatedCategory);
    }
  } catch (error) {
    res.status(500);
    res.json({
      error: "An unexpected error occurred while editing the category.",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      _id: categoryId,
    });
    res.status(204).json({ msg: "Category deleted" });

    return deletedCategory;
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while deleting the catgeory",
    });
  }
};
