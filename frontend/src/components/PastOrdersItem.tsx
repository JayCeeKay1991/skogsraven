import React from "react";
import { OrderType } from "@/types/types";
import moment from "moment";
import "./PastOrders.css";

const PastOrdersItem = ({ order }: { order: OrderType }) => {
  return (
    <div id="past-order-item" key={order._id}>
      <p id="past-order-date">
        {moment(order.date).format("ddd, DD/MM/YYYY - HH:mm")}
      </p>
      <p>Order number: {order._id}</p>
      <p>Total: {order.sumTotal + order.deliveryFee} €</p>
      <h4>{order.status}</h4>
    </div>
  );
};

export default PastOrdersItem;
