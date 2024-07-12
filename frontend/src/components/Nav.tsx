import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <nav id="nav-wrap">
      <div id="logo-wrap">
        <img id="nav-logo" src="logo-brown.png"></img>
        <h2>Skogsräven</h2>
      </div>
      <form id="search">
        <input placeholder="Category or product..."></input>
        <button>🔎</button>
      </form>
      <div id="user-buttons">
        <button className="transparent-button">🧺</button>
        <button className="transparent-button">💬</button>
        <button className="transparent-button">🤓</button>
      </div>
      <button className="transparent-button">Login</button>
      <button className="transparent-button">Logout</button>
    </nav>
  );
};

export default Nav;
