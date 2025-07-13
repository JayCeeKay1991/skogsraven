import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import {
  UserModel,
  CategoryModel,
  ProductModel,
  UserType,
  CategoryType,
  ProductType,
} from "../schemas";
import seedData from "./seedData";

const dbConfigs = {
  users: {
    url: process.env.DB_URL || "mongodb://127.0.0.1:27018/",
    name: process.env.DB_NAME_USERS || "users",
  },
  categories: {
    url: process.env.DB_URL || "mongodb://127.0.0.1:27018/",
    name: process.env.DB_NAME_CATEGORIES || "categories",
  },
  products: {
    url: process.env.DB_URL || "mongodb://127.0.0.1:27018/",
    name: process.env.DB_NAME_PRODUCTS || "products",
  },
};

async function seedService(
  serviceName: string,
  model: any,
  data: any[]
): Promise<boolean> {
  const config = dbConfigs[serviceName as keyof typeof dbConfigs];
  const connectionString = `${config.url}${config.name}`;

  try {
    await mongoose.connect(connectionString);
    console.log(`✅ Connected to ${serviceName} database`);

    // empty the db if there's old data
    await model.deleteMany({});
    console.log(`🗑️ Cleared existing ${serviceName} data`);

    const result = await model.insertMany(data);
    console.log(`✅ Seeded ${serviceName} with ${result.length} records`);

    await mongoose.disconnect();
    console.log(`🎉 ${serviceName} seeding completed!`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to seed ${serviceName}:`, error);
    await mongoose.disconnect();
    return false;
  }
}

async function getCategoriesForProducts() {
  const config = dbConfigs.categories;
  const connectionString = `${config.url}${config.name}`;
  try {
    await mongoose.connect(connectionString);
    console.log(`✅ Connected to ${config.name} database`);
    const categories = await CategoryModel.find({}).then((cat) => cat);
    await mongoose.disconnect();
    return categories;
  } catch (error) {
    console.error(`❌ Failed to find the categories:`, error);
    await mongoose.disconnect();
    return false;
  }
}

async function seedCategoriesAndProducts(): Promise<void> {
  console.log("🌱 Starting seeding categories...");
  await seedService("categories", CategoryModel, seedData.categories);

  const categories = await getCategoriesForProducts();
  let productsWithCategoryIds: ProductType[] = [];
  if (categories) {
    productsWithCategoryIds = seedData.products.map((product) => {
      const category = categories.find(
        (cat) => cat.name === product.categoryName
      );
      if (!category) {
        throw new Error(`Category "${product.categoryName}" not found`);
      }
      return { ...product, category: category._id };
    });
  }
  console.log("🌱 Starting seeding products...");
  await seedService("products", ProductModel, productsWithCategoryIds);
}

async function seedUsers(): Promise<void> {
  // hash the user's password before storing it
  const salt = await bcrypt.genSalt(10);

  let usersEncrypted = [];

  for (const user of seedData.users) {
    const hashedPassword = await bcrypt.hash(user.password, salt);
    usersEncrypted.push({ ...user, password: hashedPassword });
  }

  console.log("🌱 Starting seeding users...");
  await seedService("users", UserModel, usersEncrypted);
}

async function seedAll() {
  await seedCategoriesAndProducts();
  await seedUsers();
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAll().catch(console.error);
}

export { seedAll, seedService };
