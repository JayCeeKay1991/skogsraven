import React, { useState } from "react";
import { ProductType } from "@/types/types";
import "./ProductItem.css";
import { useCartContext } from "../contexts/CartContext";

type ProductItemProp = {
  product: ProductType;
  categoryName: string;
};

const ProductItem = ({ product, categoryName }: ProductItemProp) => {
  const { cart, addItem } = useCartContext();

  let mockImage;
  switch (categoryName) {
    case "Cooking":
      mockImage = "/mock_cooking.png";
      break;
    case "Clothing":
      mockImage = "/mock_clothes.png";
      break;
    case "Tents":
      mockImage = "/mock_tent.png";
      break;
    case "Sleeping bags":
      mockImage = "/mock_sleepingbag.png";
      break;
    case "Climbing gear":
      mockImage = "/mock_climbing.png";
      break;
    case "Vanlife":
      mockImage = "/mock_vanlife.png";
      break;
    case "Wintersports":
      mockImage = "/mock_winter.png";
      break;
    case "Other":
      mockImage = "/mock_other.png";
      break;
    default:
      mockImage = "";
  }

  const handleAddToCart = () => {
    addItem(product._id, product.name, 1, product.price);
  };

  return (
    <div id="product-item-wrap">
      <img
        className={product.numAvailable ? "" : "sold-out"}
        src={product.picture || mockImage}
        alt={product.name}
      ></img>
      <div id="product-item-text">
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
        <h3>{product.price.toFixed(2)} €</h3>
        {product.numAvailable > 0 ? (
          <button id="cart-button" onClick={handleAddToCart}>
            Add to cart
          </button>
        ) : (
          <p>"Currently out of stock 💔"</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
