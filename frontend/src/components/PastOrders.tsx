import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/order-service";
import "./PastOrders.css";
import { useAuthContext } from "../contexts/AuthContext";
import { OrderType } from "../types/types";
import moment from "moment";

const PastOrders = () => {
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
    <div id="past-orders-wrap">
      <h3>Here are your past orders ⌛️</h3>
      {orderList.length ? (
        orderList.map((order) => {
          return (
            <div id="past-order-item">
              <p>Order number: {order._id}</p>
              <p>{moment(order.date).format("ddd, DD/MM/YYYY - HH:mm")}</p>
              <p>Total: {order.sumTotal + order.deliveryFee} €</p>
              <h4>{order.status}</h4>
            </div>
          );
        })
      ) : (
        <p>No orders for this user.</p>
      )}
    </div>
  );
};

export default PastOrders;
