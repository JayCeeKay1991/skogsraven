import React, { useEffect, useState } from "react";
import { CategoryType, ProductType } from "../types/types";
import { getCategories } from "../services/category-service";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";
import { getProducts } from "../services/product-service";
import ProductList from "../components/ProductList";
import Featured from "../components/Featured";
import useStore from "../utils/store";

const Home = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [fullProductList, setFullProductList] = useState<ProductType[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<ProductType[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [categoryError, setCategoryError] = useState("");
  const [productError, setProductError] = useState("");
  const query = useStore((state) => state.query);
  const showProducts = useStore((state) => state.showProducts);

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
  }, [selectedCategory]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const allProducts = await getProducts();
        setFullProductList(allProducts);
        setFilteredProductList(allProducts);
        if (selectedCategory)
          setFilteredProductList((prev) =>
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
  }, [selectedCategory]);

  useEffect(() => {
    if (query) {
      const filtered = fullProductList.filter(
        (prod) =>
          prod.name.toLowerCase().includes(query.toLowerCase()) &&
          prod.category === selectedCategory?._id
      );

      setFilteredProductList(filtered);
    }
  }, [query]);

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
      ) : !showProducts ? (
        <Featured></Featured>
      ) : filteredProductList.length && selectedCategory ? (
        <ProductList
          productList={filteredProductList}
          categoryName={selectedCategory.name}
        ></ProductList>
      ) : (
        <p>No products for this category.</p>
      )}
    </>
  );
};

export default Home;
