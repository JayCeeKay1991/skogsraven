import React, { useEffect, useState } from "react";
import "./App.css";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";
import CategoryList from "../components/CategoryList";
import Hero from "../components/Hero";

import { useAuthContext } from "../contexts/AuthContext";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const allCategories = await getCategories();
        if (allCategories.length) setCategoryList(allCategories);
        else console.log("No categories.");
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

export default App;
