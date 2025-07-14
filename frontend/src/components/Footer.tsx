import React from "react";
import moment from "moment";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="footer-wrap">
      <div id="footer-content">
        <div id="footer-logo">
          <img src="/logo-brown.png"></img>
          <p>SKOGSRÄVEN ™</p>
        </div>
        <div>
          <p>© {moment(new Date()).format("yyyy")}</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
