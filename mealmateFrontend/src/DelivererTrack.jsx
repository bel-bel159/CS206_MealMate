import React, { useEffect, useState } from "react";
import "./style.css";
import cross from "./Assets/cross.svg";
import map from "./Assets/map.png";
import { useNavigate } from "react-router-dom";
import user from "./assets/user.svg";
import cart from "./Assets/cart.png";
import walking from "./Assets/walking.svg";
import tick from "./Assets/tick.png";
import phone from "./Assets/phone.jpg";
import pin from "./Assets/pin.svg";
import dots from "./Assets/dots.png";
 
const Circle = ({ src, color = "#fff" }) => (
  <div
        style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
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

const Line = ({color = "white"}) => (
    <div
        style={{
            flex: 1,
            height: "2px",
            backgroundColor: color
        }}
    ></div>
);

const DelivererTrack = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [orderStatus, setOrderStatus] = useState("Order is almost ready");
    const navigate = useNavigate();
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8084');
        websocket.onopen = function(event) {
            console.log("Connection established");
            setIsConnected(true);
        };
        websocket.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        }
        websocket.onerror = (error) => {
            console.log('WebSocket error:', error);
            setIsConnected(false);
        }
        websocket.onmessage = (event) => {
        console.log('Message from server ', event.data);
        };

        setWs(websocket);

        return () => {
            setIsConnected(false);
            websocket.close(); // Clean up the connection on component unmount
        };
        }, []);

    const handleOrderStatusChange = (nextStatus) => {
        setOrderStatus(nextStatus);
    };

    const sendStatusUpdate = (statusMessage) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: 'updateStatus', status: statusMessage }));
        }
    };

    const handlePickup = () => {
        // Update the local state to reflect the change immediately for the deliverer
        handleOrderStatusChange("Order has been picked up");
        // Send the updated status to the orderer via WebSocket
        sendStatusUpdate("Order is on the way");
    };

    const handleComplete = () => {
        // Update the local state to reflect the change immediately for the deliverer
        handleOrderStatusChange("Order has been completed");
        // Send the updated status to the orderer via WebSocket
        sendStatusUpdate("Order is completed");
    };

    return (
        <div className="background-container">
        <div
            className="background-image"
            style={{
            backgroundImage: `url(${map})`,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            }}
        ></div>

        <div className="header bg-light" style={{ position: "relative", zIndex: 1 }}>
            <button
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: "1",
            }}
            onClick={() => navigate(-1)}
            >
            <img src={cross} alt="Close" style={{ width: "30px", height: "auto" }} />
            </button>

            <div
            style={{
                width: "85px",
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "1",
            }}
            >
            <button
                style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#3CAD7E",
                borderRadius: "20px",
                border: "none",
                fontWeight: "bold",
                }}
            >
                Help
            </button>
                    </div>
            <div className="order-collected-box" style={{ position: "absolute", transform: "translateY(50%)", maxHeight: "450px" }}>
                <div className="card mb-3 mt-4 text-bg-success mx-4 p-4 border rounded-5 overflow-auto" style={{maxHeight:"500px", backgroundColor: "#3CAD7E"}}>
                    <div className="row g-0">
                        <div>
                            <div className="card-body">
                                <h4 className="card-title" style={{ color: "black", marginTop: "-10px", marginBottom: "20px" }}>{orderStatus}</h4>
                                {orderStatus === "Order is almost ready" && (
                                    <>
                                        <div className="row g-0"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Circle src={cart} />
                                            <Line />
                                            <Circle src={dots} />
                                            <Line color="#B4B4B4"/>
                                            <Circle src={tick} color="#B4B4B4" />
                                        </div>

                                        <p className="card-text" style={{ color:  "black", marginTop: "15px"}}>
                                            Deliverer to arrive in <strong>10 mins</strong>
                                        </p>
                                        <button
                                            style={{
                                                padding: "10px 20px",
                                                cursor: "pointer",
                                                backgroundColor: "#F7F4F4",
                                                borderRadius: "20px",
                                                border: "none",
                                                fontWeight: "bold",
                                                width: "100%"
                                            }}
                                            onClick={handlePickup}
                                            disabled={!isConnected}
                                        >
                                            Order Picked Up
                                        </button>
                                    </>
                                )}
                                {orderStatus === "Order has been picked up" && (
                                    <>
                                        <p className="card-text pt-2" style={{color: "black", marginTop: "-15px"}}>
                                            Arriving between <strong>11:53AM - 11:58AM</strong>
                                        </p>
                                        <div className="row g-0"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Circle src={cart} />
                                            <Line />
                                            <Circle src={walking} />
                                            <Line color="#B4B4B4"/>
                                            <Circle src={tick} color="#B4B4B4"/>
                                        </div>

                                        <p className="card-text" style={{ color: "black", marginTop: "15px"}}>
                                            Deliverer is on the way in <strong>6 min</strong>
                                        </p>
                                        <button
                                            style={{
                                                padding: "10px 20px",
                                                cursor: "pointer",
                                                backgroundColor: "#F7F4F4",
                                                borderRadius: "20px",
                                                border: "none",
                                                fontWeight: "bold",
                                                width: "100%"
                                            }}
                                            onClick={handleComplete}
                                            disabled={!isConnected}
                                        >
                                            Complete Order
                                        </button>
                                    </>
                                )}
                                {orderStatus === "Order has been completed" && (
                                    <>
                                        <div className="row g-0"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Circle src={cart} />
                                            <Line />
                                            <Circle src={walking} />
                                            <Line />
                                            <Circle src={tick} />
                                        </div>
                                        <p style={{color: "black", marginTop: "15px"}}>Your order has been successfully completed.</p>
                                    </>
                                )}
                                    {showDetails && (
                                    <div className="card mt-4 border rounded-5 w-100" style={{backgroundColor: "#A4E5CA"}}>
                                        <div className="card-body" style={{alignItems: "center"}}>
                                        <div className="row g-0 mb-3" style={{ alignItems: "center", display: "flex" }}>
                                            <div className="col-4 d-flex justify-content-center" style={{ display: "flex", alignItems: "center" }}>
                                                <Circle src={user}/>
                                            </div>
                                            <div className="col-7" style={{ marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                                <h5 className="card-title" style={{ marginLeft: "-10px", fontSize: "1rem" }}>Zhang Liang Mala Tang</h5>
                                            </div>
                                        </div>
                                            <div className="row g-0">
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <div className="col-9">
                                                        <input
                                                            type="text"
                                                            placeholder="Chat with Restaurant"
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
                                            <div className="col-7" style={{ display: "flex", alignItems: "center" }}>
                                                <img src={pin} alt="pin" style={{ width: "20px", height: "20px", marginRight: "10px", marginLeft: "5px"}} />
                                                <div>
                                                    <p style={{ fontSize: "10px", marginTop: "20px" }}>9 Bras Basah Rd, #01-02 Rendezvous Hotel, 189559</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "100%",
                                    borderTop: "3px solid #FFFFFF"
                                }}
                            />
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "16px",
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
export default DelivererTrack;
