import React, { useState } from "react";
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
import { useLocation } from 'react-router-dom';


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
  const [orderStatus, setOrderStatus] = useState("ORDER_SENT");
  const navigate = useNavigate();

  const location = useLocation();
  const { orderId } = location.state || {}; // Assuming orderId is passed, else default to an empty object

  const nextStatusMap = {
    "ORDER_SENT": "COLLECTED",
    "COLLECTED": "DELIVERED",
  };

  const handleOrderStatusChange = () => {
    const nextStatus = nextStatusMap[orderStatus];
  
    if (!nextStatus) {
      console.error('No next status defined for:', orderStatus);
      return; // Exit if no next status is defined
    }
  
    const updateOrderStatus = async () => {
      try {
        console.log(orderId, nextStatus);
        const requestBody = JSON.stringify({ orderStatus: nextStatus });
        console.log('Request Body:', requestBody);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/update/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Uncomment and replace if authorization is needed
          },
          body: requestBody,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Assuming the API returns a success message or similar indicator
        const responseData = await response.text();
        
        // Check if the API indicates success before updating the local state
        if (responseData === 'Order status updated.') {
          // Successfully updated the order status
          setOrderStatus(nextStatus);
          console.log('Order status updated:', responseData);
        } else {
          console.error('API did not indicate success:', responseData);
          // Handle cases where API does not report success as expected
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        // Handle any errors, possibly by showing an error message to the user
      }
    };
  
    // Call the function to update the order status
    updateOrderStatus();
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
                            {orderStatus === "ORDER_SENT" && (
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
                                        onClick={handleOrderStatusChange}
>
  {orderStatus === 'ORDER_SENT' ? 'COLLECTED' : 'DELIVERED'}
                                        
                                    </button>
                                </>
                            )}
                            {orderStatus === "COLLECTED" && (
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
                                        onClick={() => handleOrderStatusChange()}
                                    >
                                        Complete Order
                                    </button>
                                </>
                            )}
                            {orderStatus === "DELIVERED" && (
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
