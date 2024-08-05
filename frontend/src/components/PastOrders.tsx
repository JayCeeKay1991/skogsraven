import React from "react";
import "./PastOrders.css";
import { OrderType } from "../types/types";
import moment from "moment";
import { useAuthContext } from "../contexts/AuthContext";

type PastOrdersPropsType = {
  orderList: OrderType[];
};

const PastOrders = ({ orderList }: PastOrdersPropsType) => {
  const { user } = useAuthContext();

  return (
    <div id="past-orders-wrap">
      {user._id ? (
        <>
          <h3>Here are your past orders ⌛️</h3>
          {orderList && orderList.length ? (
            orderList.map((order) => {
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
            })
          ) : (
            <p>No orders for this user.</p>
          )}
        </>
      ) : (
        <h3>Log in to see your past orders ⌛️</h3>
      )}
    </div>
  );
};

export default PastOrders;
