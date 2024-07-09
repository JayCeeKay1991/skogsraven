import React from "react";
import { ProductType } from "@/types/types";
import "./ProductItem.css";

type ProductItemProp = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <div id="product-item-wrap">
      <h1>{product.name}</h1>
      <img src={product.picture}></img>
      <p>{product.price} $</p>
      <p>{product.available ? "On Stock 💚" : "Currently out of stock 💔"}</p>
    </div>
  );
};

export default ProductItem;
