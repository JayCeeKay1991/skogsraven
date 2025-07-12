import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import PastOrders from "../components/PastOrders";
import { useAuthContext } from "../contexts/AuthContext";
import { getOrdersByUser } from "../services/order-service";
import { OrderType } from "../types/types";
import "./Order.css";
import OrderConfirm from "../components/OrderConfirm";

const Order = () => {
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const { user } = useAuthContext();
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const ordersByUser = await getOrdersByUser(user._id);

        if (ordersByUser && ordersByUser.length) setOrderList(ordersByUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSet();
  }, [user]);

  return (
    <section id="order-wrap">
      {showOrderConfirm ? (
        <OrderConfirm setShowOrderConfirm={setShowOrderConfirm}></OrderConfirm>
      ) : (
        <Cart setShowOrderConfirm={setShowOrderConfirm}></Cart>
      )}
      <PastOrders orderList={orderList}></PastOrders>
    </section>
  );
};

export default Order;
