import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Notification() {
  return (
    <div className="Signup d-flex justify-content-center align-items-center 100-w vh-100 bg-white">
      <div class="container">
        Notif page!
        <p className="text-right">
          <Link to="/" className="ms-2">
            Go Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Notification;
