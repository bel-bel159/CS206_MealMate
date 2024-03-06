import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

const Navbar =()=> {
  return (
    <nav className="navbar">
      <div className="navbar-notifications">
        <Link to="/notification">
          <img src={require("../Assets/bell.svg")} alt="Bell Icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
