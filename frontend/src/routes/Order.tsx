import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import PastOrders from "../components/PastOrders";
import { useAuthContext } from "../contexts/AuthContext";
import { getOrdersByUser } from "../services/order-service";
import { OrderType } from "../types/types";
import "./Order.css";

const Order = () => {
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        if (!user) console.log("No logged in user.");
        const ordersByUser = await getOrdersByUser(user._id);

        if (ordersByUser && ordersByUser.length) setOrderList(ordersByUser);
        console.log("No orders found for this user.");
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSet();
  }, []);

  return (
    <section id="order-wrap">
      <Cart></Cart>
      <PastOrders orderList={orderList}></PastOrders>
    </section>
  );
};

export default Order;
