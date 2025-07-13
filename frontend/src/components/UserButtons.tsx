import { useCartContext } from "../contexts/CartContext";
import { useNotificationContext } from "../contexts/NotificationContext";
import React from "react";
import { BiMessage, BiUser, BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./UserButtons.css";

const UserButtons = ({ cartQuantity }: { cartQuantity: number }) => {
  const { cart } = useCartContext();
  const { notifications } = useNotificationContext();

  return (
    <div id="user-buttons">
      <Link to={"/order"}>
        <button className="transparent-button">
          <BiCart />
        </button>
        {cart.length ? (
          <div id="cart-badge" className="nav-badge">
            <h4>{cartQuantity}</h4>
          </div>
        ) : (
          <></>
        )}
      </Link>
      <Link to={"/messages"}>
        <button className="transparent-button">
          <BiMessage />
        </button>
        {notifications.length ? (
          <div id="notification-badge" className="nav-badge">
            <h4>
              {notifications.filter((not) => not.status !== "read").length}
            </h4>
          </div>
        ) : (
          <></>
        )}
      </Link>
      <Link to={"/profile"}>
        <button className="transparent-button">
          <BiUser />
        </button>
      </Link>
    </div>
  );
};

export default UserButtons;
