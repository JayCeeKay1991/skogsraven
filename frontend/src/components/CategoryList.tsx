import { CategoryType, ProductType } from "../types/types";
import React, { useState } from "react";
import "./CategoryList.css";
import ProductList from "./ProductList";
import Featured from "./Featured";
import useFetchProducts from "../contexts/useFetchProducts";

type CategoryListProps = {
  categoryList: CategoryType[];
};

const CategoryList = ({ categoryList }: CategoryListProps) => {
  const [productsByCategory, setProductsByCategory] = useState<ProductType[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const { productList } = useFetchProducts();
  const [error, setError] = useState("");

  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setProductsByCategory(
      productList.filter((prod) => prod.category === category._id)
    );
  };

  return (
    <>
      <div id="category-list-wrap">
        {categoryList.length ? (
          categoryList.map((category) => (
            <button
              id="category-button"
              key={category._id}
              onClick={() => handleSelectCategory(category)}
            >
              {category.name.toUpperCase()}
            </button>
          ))
        ) : (
          <h2>An error occured when loading the categories.</h2>
        )}
      </div>
      {error ? (
        <p>{error}</p>
      ) : selectedCategory && productsByCategory.length ? (
        <ProductList
          productList={productsByCategory}
          categoryName={selectedCategory.name}
        ></ProductList>
      ) : selectedCategory && !productsByCategory.length ? (
        <p>No products for this category.</p>
      ) : (
        <Featured></Featured>
      )}
    </>
  );
};

export default CategoryList;
