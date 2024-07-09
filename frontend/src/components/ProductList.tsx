import { ProductType } from "@/types/types";
import ProductItem from "./ProductItem";
import React from "react";

type ProductListProp = {
  productList: ProductType[];
};

const ProductList = ({ productList }: ProductListProp) => {
  return (
    <>
      {productList && productList.length ? (
        productList.map((prod) => {
          <ProductItem product={prod}></ProductItem>;
        })
      ) : (
        <p>No products found for this category.</p>
      )}
    </>
  );
};

export default ProductList;
