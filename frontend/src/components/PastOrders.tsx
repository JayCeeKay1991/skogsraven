import React from "react";
import "./PastOrders.css";
import { OrderType } from "../types/types";
import moment from "moment";

type PastOrdersPropsType = {
  orderList: OrderType[];
};

const PastOrders = ({ orderList }: PastOrdersPropsType) => {
  return (
    <div id="past-orders-wrap">
      <h3>Here are your past orders ⌛️</h3>
      {orderList && orderList.length ? (
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
