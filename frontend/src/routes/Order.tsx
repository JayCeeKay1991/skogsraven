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
  const [error, setError] = useState("");

  useEffect(() => {
    if (user._id) {
      const fetchAndSet = async () => {
        try {
          const ordersByUser = await getOrdersByUser(user._id);

          if (ordersByUser && ordersByUser.length) setOrderList(ordersByUser);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "An unknown error occurred. Sorry!";
          setError(errorMessage);
        }
      };
      fetchAndSet();
    }
  }, [user]);

  return (
    <section id="order-wrap">
      {showOrderConfirm ? (
        <OrderConfirm setShowOrderConfirm={setShowOrderConfirm}></OrderConfirm>
      ) : (
        <Cart setShowOrderConfirm={setShowOrderConfirm}></Cart>
      )}
      <PastOrders orderList={orderList} error={error}></PastOrders>
    </section>
  );
};

export default Order;
