import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function ConfirmOrder() {
    return (
        <div className="Signup d-flex justify-content-center align-items-center 100-w vh-100 bg-white">
            <div className="container">
                ConfirmOrder page!
                <p className="text-right">
                    <Link to="/confirm" className="ms-2">
                        Go Home
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ConfirmOrder;