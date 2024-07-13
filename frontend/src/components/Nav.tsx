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

const Nav = () => {
  const [showLoginForm, setShowloginForm] = useState(false);

  return (
    <>
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
          <BiLogInCircle
            className="login-logout-button"
            onClick={() => setShowloginForm(!showLoginForm)}
          />
          <BiLogOutCircle className="login-logout-button" />
        </div>
      </nav>
      {showLoginForm ? <LoginSignup></LoginSignup> : <></>}
    </>
  );
};

export default Nav;
