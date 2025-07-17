import { CategoryType } from "../types/types";
import React, { Dispatch, SetStateAction } from "react";
import "./CategoryList.css";
import useStore from "../utils/store";

type CategoryListProps = {
  categoryList: CategoryType[];
  setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>;
};

const CategoryList = ({
  categoryList,
  setSelectedCategory,
}: CategoryListProps) => {
  const updateShowProducts = useStore((state) => state.updateShowProducts);

  return (
    <div id="category-list-wrap">
      {categoryList.length ? (
        categoryList.map((category) => (
          <button
            id="category-button"
            key={category._id}
            onClick={() => {
              updateShowProducts(true);
              return setSelectedCategory(category);
            }}
          >
            {category.name.toUpperCase()}
          </button>
        ))
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;
