import React from "react";
import "./Search.css";
import useStore from "../utils/store";
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  const query = useStore((state) => state.query);
  const updateQuery = useStore((state) => state.updateQuery);

  return (
    <form id="search">
      <input
        placeholder="Search..."
        onChange={(e) => updateQuery(e.target.value)}
      ></input>
      <button className="transparent-button">
        <BiSearchAlt />
      </button>
    </form>
  );
};

export default Search;
