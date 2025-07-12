import React, { useEffect, useState } from "react";
import "./Home.css";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";

const Home = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const allCategories = await getCategories();
        setCategoryList(allCategories);
      } catch (error) {
        console.error("Error getting all categories.");
      }
    };
    fetchAndSet();
  }, []);

  return (
    <>
      <Hero></Hero>
      <CategoryList categoryList={categoryList}></CategoryList>
    </>
  );
};

export default Home;
