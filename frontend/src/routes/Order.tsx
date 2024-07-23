import React from "react";
import Cart from "../components/Cart";
import PastOrders from "../components/PastOrders";
import "./Order.css";

const Order = () => {
  return (
    <section id="order-wrap">
      <Cart></Cart>
      <PastOrders></PastOrders>
    </section>
  );
};

export default Order;
