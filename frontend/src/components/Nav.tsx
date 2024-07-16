import React, { useState } from "react";
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

const Nav = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, setUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(initialStateUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="nav-with-login">
      <nav id="nav-wrap">
        <div id="logo-wrap">
          <img id="nav-logo" src="logo-brown.png"></img>
          <h2>Skogsräven</h2>
        </div>
        <form id="search">
          <input placeholder="Search..."></input>
          <button className="transparent-button">
            <BiSearchAlt />
          </button>
        </form>
        <div id="user-buttons">
          <button className="transparent-button">
            <BiCart />
          </button>
          <button className="transparent-button">
            <BiMessage />
          </button>
          <button className="transparent-button">
            <BiUser />
          </button>
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
