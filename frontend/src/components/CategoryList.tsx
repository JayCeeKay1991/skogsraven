import { CategoryType } from "@/types/types";
import React from "react";
import "./CategoryList.css";

type CategoryListProps = {
  categoryList: CategoryType[];
};

const CategoryList = ({ categoryList }: CategoryListProps) => {
  return (
    <div id="category-list-wrap">
      {categoryList.length ? (
        categoryList.map((category) => (
          <button id="category-button" key={category._id}>
            {category.name}
          </button>
        ))
      ) : (
        <h2>No categories yet.</h2>
      )}
    </div>
  );
};

export default CategoryList;
