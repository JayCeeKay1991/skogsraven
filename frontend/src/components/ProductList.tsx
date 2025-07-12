import { ProductType } from "@/types/types";
import ProductItem from "./ProductItem";
import React from "react";
import "./ProductList.css";

type ProductListProp = {
  productList: ProductType[];
  categoryName: string;
};

const ProductList = ({ productList, categoryName }: ProductListProp) => {
  return (
    <div id="product-list-wrap">
      {productList.length ? (
        productList.map((product) => {
          return (
            <ProductItem
              product={product}
              categoryName={categoryName}
              key={product._id}
            ></ProductItem>
          );
        })
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductList;
