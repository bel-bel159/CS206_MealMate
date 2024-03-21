import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import backbutton from "./Assets/backbutton.png";
import soup from "./Assets/tomatosoup.png";
import starEmpty from "./Assets/star.png";
import starFilled from "./Assets/starFilled.png";
import user from "./Assets/user.svg";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const [orderRating, setOrderRating] = useState(0); // State for order satisfaction rating
    const [delivererRating, setDelivererRating] = useState(0); // State for deliverer rating

    // Function to handle star click event for order satisfaction rating
    const handleOrderStarClick = (index) => {
        setOrderRating(index + 1);
    };

    // Function to handle star click event for deliverer rating
    const handleDelivererStarClick = (index) => {
        setDelivererRating(index + 1);
    };

    // Render stars for order satisfaction rating
    const renderOrderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i < orderRating ? starFilled : starEmpty}
                    alt={i < orderRating ? "Filled Star" : "Empty Star"}
                    style={{ cursor: "pointer", width: "50px", height: "auto" }}
                    onClick={() => handleOrderStarClick(i)}
                />
            );
        }
        return stars;
    };

    // Render stars for deliverer rating
    const renderDelivererStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i < delivererRating ? starFilled : starEmpty}
                    alt={i < delivererRating ? "Filled Star" : "Empty Star"}
                    style={{ cursor: "pointer", width: "50px", height: "auto" }}
                    onClick={() => handleDelivererStarClick(i)}
                />
            );
        }
        return stars;
    };

    return (
        <div>
            {/* Header */}
            <div className="header bg-light" style={{ width: "100%", height: "50px", boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", height: "50px", position: 'relative' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', transform: 'translateY(20%)' }}>
                        <img
                            src={backbutton}
                            alt="Back"
                            style={{ width: "30px", height: "auto" }}
                            onClick={() => navigate(-1)}
                        />
                    </button>

                    <div style={{ position: 'absolute', width: "100%", top: '50%', transform: 'translateY(-30%)', textAlign: 'center', fontWeight: 'bold' }}>
                        Order Completed
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                {/* Food Delivery */}
                <div style={{ flex: 1, textAlign: 'center', paddingTop: '30px' }}>
                    <h4>Your food has been delivered!</h4>
                    <img
                        src={soup}
                        style={{ width: "50%", height: "auto" }}
                    />
                </div>
            </div>

            {/* Order Satisfaction Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', backgroundColor: '#FFC218' }}>
                <div style={{ flex: 1, textAlign: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    <h4>Were you satisfied with your order?</h4>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '10px', marginBottom: '10px' }}>
                        {renderOrderStars()}
                    </div>
                </div>
            </div>

            {/* Deliverer Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#FFC218' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4>Rate your deliverer</h4>
                    <img
                        src={user}
                        style={{ width: "20%", height: "auto" }}
                    />
                    <h2>Alex Tan</h2>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '20px', marginBottom: '20px' }}>
                        {renderDelivererStars()}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                <button
                    style={{
                        padding: '20px 30px',
                        cursor: 'pointer',
                        backgroundColor: (orderRating === 0 || delivererRating === 0) ? '#CCCCCC' : '#FFC218',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                    onClick={() => navigate('/notification-order-completed')}
                    disabled={orderRating === 0 || delivererRating === 0}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h2>Confirm Order Completion</h2>
                    </div>
                </button>
            </div>


        </div>
    );
}

export default ConfirmOrder;
