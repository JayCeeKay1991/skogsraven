import React from "react";
import "./PastOrders.css";
import { OrderType } from "../types/types";
import { useAuthContext } from "../contexts/AuthContext";
import PastOrdersItem from "./PastOrdersItem";

type PastOrdersPropsType = {
  orderList: OrderType[];
  error: string;
};

const PastOrders = ({ orderList, error }: PastOrdersPropsType) => {
  const { user } = useAuthContext();

  return (
    <div id="past-orders-wrap">
      {error !== "" ? (
        <>{error}</>
      ) : user._id ? (
        <div id="past-orders-box">
          <h3>Your past orders</h3>
          {orderList && orderList.length ? (
            orderList.map((order) => {
              return <PastOrdersItem order={order}></PastOrdersItem>;
            })
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      ) : (
        <h3>Log in to see your past orders.</h3>
      )}
    </div>
  );
};

export default PastOrders;
