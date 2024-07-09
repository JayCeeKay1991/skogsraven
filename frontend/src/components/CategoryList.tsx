import { CategoryType, ProductType } from "@/types/types";
import React, { useEffect, useState } from "react";
import "./CategoryList.css";
import ProductList from "./ProductList";
import { getProducts } from "../services/product-service";
import Featured from "./Featured";

type CategoryListProps = {
  categoryList: CategoryType[];
};

const CategoryList = ({ categoryList }: CategoryListProps) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    const fetchProductsByCategory = async (selectedCategory: CategoryType) => {
      setSelectedCategory(selectedCategory);
      try {
        const allProducts = await getProducts();
        console.log(allProducts);
        if (allProducts.length)
          setProductList(
            allProducts.filter((prod) => prod.category === selectedCategory._id)
          );
        else console.log("No products.");
      } catch (error) {
        console.error("Error getting all products.");
      }
    };
    if (selectedCategory) fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div id="category-list-wrap">
        {categoryList.length ? (
          categoryList.map((category) => (
            <button
              id="category-button"
              key={category._id}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </button>
          ))
        ) : (
          <h2>An error occured when loading the categories.</h2>
        )}
      </div>
      {selectedCategory && productList.length ? (
        <ProductList productList={productList}></ProductList>
      ) : (
        <Featured></Featured>
      )}
    </>
  );
};

export default CategoryList;
