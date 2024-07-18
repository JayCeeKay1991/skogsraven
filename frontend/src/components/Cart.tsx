import React from "react";
import { useCartContext } from "../contexts/CartContext";
import ProductItem from "./ProductItem";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart, addItem, removeItem } = useCartContext();

  return (
    <section id="cart-wrap">
      <h2>Your order in process</h2>
      <div id="cart-header">
        <h3 className="first-col">Quantity</h3>
        <h3 className="second-col">Item</h3>
        <h3 className="third-col">Price</h3>
        <h3 className="fourth-col">Remove</h3>
      </div>

      {cart.length ? (
        cart.map((item) => (
          <div id="item-details" key={item.productId}>
            <div id="item-qty" className="first-col">
              <p>{item.quantity}</p>
              <div id="qty-button">
                <button className="transparent-button">▲</button>
                <button className="transparent-button">▼</button>
              </div>
            </div>
            <p className="second-col">{item.product}</p>
            <p className="third-col">{`${item.price},00 €`}</p>
            <button
              id="delete-button"
              className="fourth-col, transparent-button"
              onClick={() => removeItem(item.productId)}
            >
              ❌
            </button>
          </div>
        ))
      ) : (
        <></>
      )}
    </section>
  );
};

export default Cart;
