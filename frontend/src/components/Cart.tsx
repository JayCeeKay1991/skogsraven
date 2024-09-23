import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { placeOrder } from "../services/cart-service";
import "./Cart.css";

type props = {
  setShowOrderConfirm: (showOrderConfirm: boolean) => void;
};

const Cart = ({ setShowOrderConfirm }: props) => {
  const { cart, setCart, removeItem, emptyCart } = useCartContext();

  const incrementQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const response = await placeOrder();
  //     if (response.message === "Order placed successfully") {
  //       setCart([]); // Clear the cart
  //     }
  //   } catch (error) {
  //     console.error("Failed to place order", error);
  //   }
  // };

  return (
    <section id="cart-wrap">
      <h2>Here's what's in your cart 🛒</h2>
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
                <button
                  className="transparent-button"
                  onClick={() => incrementQuantity(item.productId)}
                >
                  ▲
                </button>
                <button
                  className="transparent-button"
                  onClick={() => decrementQuantity(item.productId)}
                >
                  ▼
                </button>
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
      {cart.length ? (
        <>
          <div id="sum-total">
            <p className="third-col">
              {`${cart.reduce((acc, item) => {
                return (acc += item.price * item.quantity);
              }, 0)},00 €`}
            </p>
          </div>
          <div id="cart-action-buttons">
            <button id="order-button" onClick={() => setShowOrderConfirm(true)}>
              Order now
            </button>
            <button id="delete-order-button" onClick={emptyCart}>
              Delete all
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Cart;
