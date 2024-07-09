import { ProductType } from "@/types/types";
import ProductItem from "./ProductItem";
import React from "react";

type ProductListProp = {
  productList: ProductType[];
};

const ProductList = ({ productList }: ProductListProp) => {
  return (
    <>
      {productList.length ? (
        productList.map((product) => {
          return (
            <ProductItem product={product} key={product._id}></ProductItem>
          );
        })
      ) : (
        <p>No products found for this category.</p>
      )}
    </>
  );
};

export default ProductList;
