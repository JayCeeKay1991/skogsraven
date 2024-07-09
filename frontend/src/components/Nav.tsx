import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <nav id="nav-wrap">
      <img id="nav-logo"></img>
      <form id="search">
        <input placeholder="Category or product"></input>
        <button>Search</button>
      </form>
      <button>Cart</button>
      <button>Profile</button>
      <button>Messages</button>
      <button>Login</button>
      <button>Logout</button>
    </nav>
  );
};

export default Nav;
