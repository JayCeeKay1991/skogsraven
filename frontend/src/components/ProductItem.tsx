import React from "react";
import { ProductType } from "@/types/types";
import "./ProductItem.css";

type ProductItemProp = {
  product: ProductType;
};

const ProductItem = ({ product }: ProductItemProp) => {
  return (
    <div id="product-item-wrap">
      <img src={product.picture}></img>
      <div id="product-item-text">
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
        <h3>{product.price}.00 €</h3>
        {product.numAvailable > 0 ? (
          <button id="cart-button">Add to cart</button>
        ) : (
          <p>"Currently out of stock 💔"</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
