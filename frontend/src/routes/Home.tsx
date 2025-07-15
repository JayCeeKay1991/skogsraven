import React, { useEffect, useState } from "react";
import { CategoryType, ProductType } from "../types/types";
import { getCategories } from "../services/category-service";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";
import { getProducts } from "../services/product-service";
import ProductList from "../components/ProductList";
import Featured from "../components/Featured";

const Home = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [categoryError, setCategoryError] = useState("");
  const [productError, setProductError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const allCategories = await getCategories();
        setCategoryList(allCategories);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Sorry!";
        setCategoryError(errorMessage);
      }
    };
    fetchAndSetCategories();
  }, []);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProductList(allProducts);
        if (selectedCategory)
          setProductList((prev) =>
            prev.filter((prod) => prod.category === selectedCategory._id)
          );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Sorry!";
        setProductError(errorMessage);
      }
    };
    fetchAndSetProducts();
  }, [selectedCategory, query]);

  const showProducts = selectedCategory;
  return (
    <>
      <Hero />
      {categoryError ? (
        <p>{categoryError}</p>
      ) : (
        <CategoryList
          categoryList={categoryList}
          setSelectedCategory={setSelectedCategory}
        ></CategoryList>
      )}
      {productError ? (
        <p>{productError}</p>
      ) : (
        <>
          {showProducts && productList.length !== 0 ? (
            <ProductList
              productList={productList}
              categoryName={selectedCategory.name}
            ></ProductList>
          ) : !productList.length ? (
            <p>No products for this category.</p>
          ) : (
            <Featured></Featured>
          )}
        </>
      )}
    </>
  );
};

export default Home;
