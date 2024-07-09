import React from "react";
import { ProductType } from "@/types/types";

type ProductItemProp = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.picture}></img>
          <p>{product.price}</p>
          <p>{product.available ? "In Stock 💚" : "Out of stock 💔"}</p>
        </>
      ) : (
        <p>Error ☹️</p>
      )}
    </>
  );
};

export default ProductItem;
