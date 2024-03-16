import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Track() {
    return (
        <div className="Signup d-flex justify-content-center align-items-center 100-w vh-100 bg-white">
            <div className="container">
                Track page!
                <p className="text-right">
                    <Link to="/track" className="ms-2">
                        Go Home
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Track;