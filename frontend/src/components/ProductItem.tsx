import React from "react";
import { ProductType } from "@/types/types";
import "./ProductItem.css";

type ProductItemProp = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <div id="product-item-wrap">
      <div id="product-item-text">
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
      </div>
      <img src={product.picture}></img>
      <div id="product-item-price">
        <p style={{ fontWeight: 800 }}>{product.price}.00 €</p>
        <p style={{ fontSize: "10px" }}>
          {product.numAvailable > 0
            ? "On Stock 💚"
            : "Currently out of stock 💔"}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
