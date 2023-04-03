import React from "react";
import Dropdown from "./Dropdown";
import "./Search_sidebar.css";
function Search_sidebar(props) {
  return (
    <>
      <div className="">
        <div className="filter">
          <p style={{ color: "000000B2", fontSize: "1.1rem" }} href="/">
            Filter by
          </p>
        </div>

        <div className="filter">
          <Dropdown
            selected={props.selected}
            setselected={props.setselected}
            search={props.search}
          />
        </div>
      </div>
    </>
  );
}

export default Search_sidebar;
