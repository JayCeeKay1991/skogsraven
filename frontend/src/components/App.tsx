import React, { useEffect, useState } from "react";
import "./App.css";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";

function App() {
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
      <h1>Hi 😻</h1>
      {categoryList.length ? (
        categoryList.map((category, i) => (
          <p key={category._id}>
            Category {categoryList.indexOf(category) + 1}: {category.name}
          </p>
        ))
      ) : (
        <h2>No categories yet.</h2>
      )}
    </>
  );
}

export default App;
