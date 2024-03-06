import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Signup d-flex justify-content-center align-items-center 100-w vh-100 bg-white">
      <div className="container ">
        
        Home page!
        <p className="text-right">
          <Link to="/login" className="ms-2">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
