import React from "react";
import "./SubNav.css";
import { useAuthContext } from "../contexts/AuthContext";

const SubNav = () => {
  const { user } = useAuthContext();

  return (
    <nav id="sub-nav-wrap">
      <div id="subnav-icon-wrap">
        <img className="subnav-icon" src="fb-icon.png"></img>
        <img className="subnav-icon" src="ig-icon.png"></img>
        <img className="subnav-icon" src="linkedin-icon.png"></img>
      </div>
      <p>
        {user._id
          ? `Welcome back, ${
              user.billingAddress?.name ||
              user.shippingAddress?.name ||
              user.email
            }!`
          : "Sign up this week and get 15% off your first order!"}
      </p>
      <div id="subnav-links">
        <a className="transparent-button">NEWS</a>
        <a className="transparent-button">ABOUT</a>
        <a className="transparent-button">CONTACT</a>
      </div>
    </nav>
  );
};

export default SubNav;
