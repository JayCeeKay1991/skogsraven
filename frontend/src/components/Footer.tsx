import React from "react";
import moment from "moment";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="footer-wrap">
      <div id="footer-columns">
        <div>
          <div id="footer-logo">
            <img src="/logo-brown.png"></img>
            <p>SKOGSRÄVEN ™</p>
          </div>
          <div>
            <p>© {moment(new Date()).format("yyyy")}</p>
            <p>All rights reserved.</p>
          </div>
        </div>
        <div id="footer-links">
          <a>News</a>
          <a>About</a>
          <a>Contact</a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
