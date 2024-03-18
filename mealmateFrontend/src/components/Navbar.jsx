import React from "react";
import "../style.css";
import { Link, useLocation } from "react-router-dom";
import bell from "../Assets/bell.svg";
import cart from "../Assets/cart.svg";

const Navbar = () => {
  return (
    <nav className="navbar bg-light">
  <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
    <div className="navbar-notifications">
      <Link to="/notification">
        <img
          src={bell}
          alt="bell"
          style={{ width: "35px", height: "auto", marginLeft: "20px" }}
        />
      </Link>
    </div>
    <div className="navbar-cart">
      <Link to="/cart">
        <img
          src={cart}
          alt="cart"
          style={{ width: "35px", height: "auto", marginRight: "20px" }}
        />
      </Link>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
