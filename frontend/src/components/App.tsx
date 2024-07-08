import React, { useEffect, useState } from "react";
import "./App.css";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";
import Nav from "./Nav";
import CategoryList from "./CategoryList";

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
      <Nav></Nav>
      <CategoryList categoryList={categoryList}></CategoryList>
    </>
  );
};

export default App;
