import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./Search.css";

const Search = () => {
  return (
    <form id="search">
      <input placeholder="Search..."></input>
      <button className="transparent-button">
        <BiSearchAlt />
      </button>
    </form>
  );
};

export default Search;
