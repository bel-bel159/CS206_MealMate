import React, { useState, useEffect } from "react";
import "./style.css";
import backbutton from "./Assets/backbutton.png";
import chinese from "./Assets/chinese.png";
import walking from "./Assets/walking.svg";
import { useNavigate } from "react-router-dom";
import shieldExclamation from "./Assets/shieldExclamation.png";
import tick from "./Assets/tick.png";

const NotificationOrderCompleted = () => {
    const navigate = useNavigate();

    const [showFourthNotification, setShowFourthNotification] = useState(true);
    const [showThirdNotification, setShowThirdNotification] = useState(true);
    const [showSecondNotification, setShowSecondNotification] = useState(true);
    const [showFirstNotification, setShowFirstNotification] = useState(true);
    const [showHorizontalLines, setShowHorizontalLines] = useState(true);

    const clearNotifications = () => {
        setShowFourthNotification(false);
        setShowThirdNotification(false);
        setShowSecondNotification(false);
        setShowFirstNotification(false);
        setShowHorizontalLines(false);
    };

    return (
        <div className="header bg-light" style={{ width: "100%", height: "50px", boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", height: "50px", position: 'relative' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', transform: 'translateY(20%)' }}>
                    <img
                        src={backbutton}
                        alt="Back"
                        style={{ width: "30px", height: "auto" }}
                        onClick={() => navigate('/')}
                    />
                </button>

                <div style={{ position: 'absolute', width: "100%", top: '50%', transform: 'translateY(-30%)', textAlign: 'center', fontWeight: 'bold' }}>
                    Notifications
                </div>
                <div style={{ width: '85px', transform: 'translateY(6%)' }}>
                    <button style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor: '#FFC218',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                    }} onClick={clearNotifications}>
                        Clear
                    </button>
                </div>
            </div>

            {/* Display Notification 4 */}
            {showFourthNotification && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '20px', padding: '10px', marginRight: '150px'}}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer'}}>
                        <img
                            src={tick}
                            style={{ width: "30px", height: "auto" }}
                        />
                    </button>

                    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', paddingTop: '20px' }}>
                        <h4>Order Completed!</h4>
                    </div>
                </div>
            )}
            {showHorizontalLines && <hr style={{ width: '100%', color: '#FFC218', marginTop: '10px' }} />}


            {/* Display Notification 3 */}
            {showThirdNotification && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <img
                            src={shieldExclamation}
                            style={{ width: "45px", height: "auto" }}
                        />
                    </button>
                    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', paddingTop: '20px'}}>
                        <h4>Confirm Order Completion!</h4>
                    </div>
                    <button style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor: '#CCCCCC',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        transform: 'translateY(15%) translateX(15%)',
                        color: '#555555'
                    }}>
                        Confirm
                    </button>
                </div>
            )}
            {showHorizontalLines && <hr style={{ width: '100%', color: '#FFC218', marginTop: '10px' }} />}

            {showSecondNotification && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <img
                            src={walking}
                            style={{ width: "50px", height: "auto" }}
                        />
                    </button>

                    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', paddingTop: '20px' }}>
                        <h4>Your order has been collected!</h4>
                    </div>

                    <button style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor: '#CCCCCC',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        transform: 'translateY(15%) translateX(15%)',
                        color: '#555555'
                    }}>
                        Track
                    </button>
                </div>
            )}
            {showHorizontalLines && <hr style={{ width: '100%', color: '#FFC218', marginTop: '10px' }} />}

            {showFirstNotification && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <img
                            src={chinese}
                            style={{ width: "60px", height: "auto" }}
                        />
                    </button>

                    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', paddingTop: '20px' }}>
                        <h4>Your order has been sent to the kitchen!</h4>
                    </div>
                </div>
            )}
            {showHorizontalLines && <hr style={{ width: '100%', color: '#FFC218', marginTop: '10px' }} />}
        </div>
    );
}

export default NotificationOrderCompleted;
