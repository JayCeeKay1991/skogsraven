import React, { useEffect, useState } from "react";
import {
  BiLogInCircle,
  BiLogOutCircle,
  BiCart,
  BiMessage,
  BiUser,
  BiSearchAlt,
} from "react-icons/bi";
import "./Nav.css";
import LoginSignup from "./LoginSignup";
import { useAuthContext } from "../contexts/AuthContext";
import { initialStateUser } from "../contexts/AuthContext";
import { logout } from "../services/user-service";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useNotificationContext } from "../contexts/NotificationContext";

const Nav = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const { user, setUser } = useAuthContext();
  const { cart } = useCartContext();
  const { notifications } = useNotificationContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(initialStateUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cart.length) {
      const numberOfArticles = cart.reduce((acc, item) => {
        return (acc += item.quantity);
      }, 0);
      setCartQuantity(numberOfArticles);
    }
  }, [cart]);

  return (
    <div id="nav-with-login">
      <nav id="nav-wrap">
        <Link to={"/home"} style={{ textDecorationLine: "none" }}>
          <div id="logo-wrap">
            <img id="nav-logo" src="logo-brown.png"></img>
            <h2>Skogsräven</h2>
          </div>
        </Link>
        <form id="search">
          <input placeholder="Search..."></input>
          <button className="transparent-button">
            <BiSearchAlt />
          </button>
        </form>
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
        <div id="login-logout">
          {user._id ? (
            <BiLogOutCircle
              className="login-logout-button"
              onClick={handleLogout}
            />
          ) : (
            <BiLogInCircle
              className="login-logout-button"
              onClick={() => setShowLoginForm(!showLoginForm)}
            />
          )}
        </div>
      </nav>
      {showLoginForm ? (
        <LoginSignup setShowLoginForm={setShowLoginForm}></LoginSignup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nav;
