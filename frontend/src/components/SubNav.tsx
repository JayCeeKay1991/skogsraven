import React from "react";
import "./SubNav.css";

const SubNav = () => {
  return (
    <nav id="sub-nav-wrap">
      <div id="subnav-icon-wrap">
        <img className="subnav-icon" src="fb-icon.png"></img>
        <img className="subnav-icon" src="ig-icon.png"></img>
        <img className="subnav-icon" src="linkedin-icon.png"></img>
      </div>
      <div id="subnav-links">
        <a className="transparent-button">NEWS</a>
        <a className="transparent-button">ABOUT</a>
        <a className="transparent-button">CONTACT</a>
      </div>
    </nav>
  );
};

export default SubNav;
