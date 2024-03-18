import React, { useState } from "react";
import "./style.css";
import cross from "./Assets/cross.svg";
import map from "./Assets/map.png";
import { useNavigate } from "react-router-dom";
import user from "./assets/user.svg";
import cart from "./Assets/cart.png";
import walking from "./Assets/walking.svg";
import location from "./Assets/location.jpg";
import phone from "./Assets/phone.jpg";

const Circle = ({ src }) => (
    <div
        style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
        }}
    >
        {src === walking ? (
            <img
                src={src}
                alt="icon"
                style={{ maxWidth: "50%", maxHeight: "50%", transform: "scaleX(-1)" }}
            />
        ) : (
            <img src={src} alt="icon" style={{ maxWidth: "50%", maxHeight: "50%" }} />
        )}
    </div>
);

const PhoneCircle = ({ src }) => (
    <div
        style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
        }}
    >
        <img src={src} alt="icon" style={{ maxWidth: "50%", maxHeight: "50%" }} />
    </div>
);

const LocationCircle = ({ src }) => (
    <div
        style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
        }}
    >
        <img src={src} alt="icon" style={{ maxWidth: "50%", maxHeight: "50%" }} />
    </div>
);


const Line = () => (
    <div
        style={{
            flex: 1,
            border: "2px solid white"
        }}
    ></div>
);

const Track = () => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="background-container">
            {/* Background image */}
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${map})`,
                    backgroundSize: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            ></div>

            {/* Content */}
            <div className="header bg-light" style={{ position: "relative", zIndex: 1 }}>
                {/* Cross button */}
                <button
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: "1"
                    }}
                >
                    <img
                        src={cross}
                        style={{ width: "30px", height: "auto" }}
                        onClick={() => navigate(-1)}
                    />
                </button>

                {/* Help button */}
                <div
                    style={{
                        width: "85px",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: "1"
                    }}
                >
                    <button
                        style={{
                            padding: "10px 20px",
                            cursor: "pointer",
                            backgroundColor: "#FFC218",
                            borderRadius: "20px",
                            border: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Help
                    </button>
                </div>

                {/* Order collected box */}
                <div
                    className="order-collected-box"
                    style={{ position: "absolute", transform: "translateY(50%)", maxHeight: "450px" }}
                >
                    <div className="card mb-3 mt-4 text-bg-warning mx-4 p-4 border rounded-5 overflow-auto" style={{maxHeight:"500px"}}>
                        <div className="row g-0">
                            <div>
                                <div className="card-body">
                                    <div className="row g-0">
                                        <h4 className="card-title">Order has been collected</h4>
                                        <p className="card-text pt-2">
                                            Arriving between <strong>11:53AM - 11:58AM</strong>
                                            <small className="text-body-secondary"></small>
                                        </p>
                                    </div>
                                    <div className="row g-0"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            margin: "10px auto",
                                        }}
                                    >
                                        <Circle src={cart} />
                                        <Line />
                                        <Circle src={walking} />
                                        <Line />
                                        <Circle src={location} />
                                    </div>

                                    <div className="row g-0">
                                        <p className="card-text">
                                            Deliverer is on the way in <strong>6 min</strong>
                                            <small className="text-body-secondary"></small>
                                        </p>
                                    </div>
                                    {showDetails && (<div className="row g-0">
                                        <div
                                            className="card mt-4 border rounded-5 w-100"
                                            style={{backgroundColor: "#ffea96"}}
                                        >
                                            <div
                                                className="card-body"
                                                style={{alignItems: "center"}}
                                            >
                                                <div className="row g-0 mb-3">
                                                    <div className="col-4 d-flex justify-content-center">
                                                        <Circle src={user}/>
                                                    </div>
                                                    <div className="col-7" style={{marginLeft: "10px"}}>
                                                        <h5 className="card-title">Alex Tan</h5>
                                                        <h6 className="card-text pt-2">
                                                            4.8/5.0<small className="text-body-secondary"></small>
                                                        </h6>
                                                    </div>
                                                </div>
                                                {/* Typable box with button */}
                                                <div className="row g-0">
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <div className="col-9">
                                                            <input
                                                                type="text"
                                                                placeholder="Chat with deliverer"
                                                                style={{
                                                                    padding: "10px",
                                                                    flex: 1,
                                                                    borderRadius: "10px",
                                                                    border: "1px solid #ccc",
                                                                    width: "100%"
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-3 d-flex justify-content-center">
                                                            <button
                                                                style={{
                                                                    background: "none",
                                                                    border: "none",
                                                                    cursor: "pointer",
                                                                    marginLeft: "10px",
                                                                }}
                                                            >
                                                                <PhoneCircle src={phone}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-0 mt-3">
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <div className="col-3">
                                                            <LocationCircle src={location}/>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="fs-6"> SMU SCIS1 IS Lounge SR B1-01</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>

                            </div>
                            <hr
                                style={{
                                    width: "100%",
                                    borderTop: "3px solid #FFFFFF",
                                    marginTop: "10px"
                                }}
                            />
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "16px", // Adjusted font size
                                }}
                                onClick={toggleDetails}
                            >
                                View All Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Track;
