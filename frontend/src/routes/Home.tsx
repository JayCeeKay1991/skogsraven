import React, { useEffect, useState } from "react";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";

const Home = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const allCategories = await getCategories();
        setCategoryList(allCategories);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Sorry!";
        setError(errorMessage);
      }
    };
    fetchAndSet();
  }, []);

  return (
    <>
      <Hero></Hero>
      {error ? (
        <p>{error}</p>
      ) : (
        <CategoryList categoryList={categoryList}></CategoryList>
      )}
    </>
  );
};

export default Home;
