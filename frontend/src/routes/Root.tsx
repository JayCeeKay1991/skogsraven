import React from "react";
import Nav from "../components/Nav";
import SubNav from "../components/SubNav";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div id="root-container">
      <Nav />
      <SubNav />
      <div id="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Root;
