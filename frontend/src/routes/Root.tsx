import React from "react";
import Nav from "../components/Nav";
import SubNav from "../components/SubNav";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Nav></Nav>
      <SubNav></SubNav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};
export default Root;
