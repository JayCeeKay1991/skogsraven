import React, { useEffect, useState } from "react";
import {
  BiLogInCircle,
  BiLogOutCircle,
  BiCart,
  BiMessage,
  BiUser,
} from "react-icons/bi";
import "./Nav.css";
import LoginSignup from "./LoginSignup";
import { useAuthContext } from "../contexts/AuthContext";
import { initialStateUser } from "../contexts/AuthContext";
import { logout } from "../services/user-service";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import Search from "./Search";
import UserButtons from "./UserButtons";

const Nav = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const { user, setUser } = useAuthContext();
  const { cart } = useCartContext();

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
        <Search></Search>
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
      <UserButtons cartQuantity={cartQuantity}></UserButtons>
      {showLoginForm && (
        <LoginSignup setShowLoginForm={setShowLoginForm}></LoginSignup>
      )}
    </div>
  );
};

export default Nav;
