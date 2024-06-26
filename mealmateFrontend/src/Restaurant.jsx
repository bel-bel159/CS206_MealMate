import React from "react";
import "./style.css";
import zlmlt from "./Assets/zlmlt.png";
import backbutton from "./Assets/backbutton.png"
import frontbutton from "./Assets/frontbutton.png"
import tomatosoup from "./Assets/tomatosoup.png"
import malasoup from "./Assets/malasoup.png"
import mushroomsoup from "./Assets/mushroomsoup.png"
import tomyumsoup from "./Assets/tomyumsoup.png"
import zlmltbottom from "./Assets/zlmltbottom.png"
import cart from "./Assets/cart.png"
import star from "./Assets/star.png"
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Restaurant=()=> {

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/orderItems`)
      .then(response => response.json())
      .then(data => {
        setOrderItems(data);
      })
      .catch(error => console.error('Error fetching order items:', error));
  }, []);

  const[orderItems, setOrderItems] = useState([]);
  const email = localStorage.getItem('userEmail') || 'No email found';
  //hardcode the no. of items in cart
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (itemId) => {
    setCartCount(cartCount + 1);
    const updatedOrderItems = [itemId];

    const deliveryCartData = {
      ordererId: 1, // Adjust based on your application's needs
      orderItemsId: updatedOrderItems,
      totalPrice: 0, // Implement this function based on your needs
      // Add any other necessary data
    };
    fetch(`${import.meta.env.VITE_API_BASE_URL}/deliveryCarts/update/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include any required authentication headers
      },
      body: JSON.stringify(deliveryCartData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update delivery cart');
      }
      return response.json();
    })
    .then(data => {
      console.log('Cart updated successfully', data);
      // Optionally reset cartItems state or provide feedback to the user
    })
    .catch(error => {
      console.error('Error updating cart:', error);
    });
  }
   
  return (
    <div className="header bg-light">
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1020, backgroundColor: '#f8f9fa' }}>
        <div className="d-flex justify-content-between align-items-center" style={{ padding: '10px' }}>
          <button style={{ background: 'none', border: 'none' }}>
            <img
              src={backbutton}
              alt="Back"
              style={{ width: "30px", height: "auto" }} // Adjust size as needed
              onClick={() => navigate(-1)}
            />
          </button>
          <button style={{ background: 'none', border: 'none' }}
            onClick={() => navigate('/cart')}>
            <img
              src={cart}
              alt="cart"
              style={{ width: "30px", height: "auto" }}
            />
            {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '5px',
              right: '3px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}>
              {cartCount} {/* Display the dynamic count */}
            </span>
          )}
          </button>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', marginTop: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={zlmlt}
        alt="Background"
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
        <Card.Header 
          className="d-flex flex-row align-items-center justify-content-center" // Added justify-content-center for centering content
          style={{
            position: 'absolute',
            backgroundColor: '#FFF', // White background
            color: 'black', // Changed color to black for text visibility
            height: '200px',
            width: '80%', // Control the width of the card relative to the parent
            top: '80%', // Adjusted to position the card header vertically at the center
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            borderRadius: '15px', // Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
            padding: '20px', // Adds space inside the white card, around the yellow div
            display: 'flex', // Ensures the flex-box model is applied
            alignItems: 'center', // Vertically center the content
            justifyContent: 'center' // Horizontally center the content
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center" // Center the content within the yellow div
            style={{
              backgroundColor: '#FFC218', // Yellow background
              color: 'black', // Text color changed to black for visibility
              height: '99%', // Adjusted to ensure there's a slight space around it inside the white card
              width: '99%', // Adjusted to ensure there's a slight space around it inside the white card
              borderRadius: '10px', // Rounded corners
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Shadow effect
            }}
          >
            <div style={{ width: '100%', borderBottom: '1px solid white', textAlign: 'center', padding: '5px 0 15px' }}>
              Zhang Liang Mala Tang
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid white', padding: '10px 0' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>Ratings and Reviews</div>
              <button style={{ background: 'none', border: 'none', marginLeft: 'auto' }}>
                <img
                  src={frontbutton} // Replace with the correct path
                  alt="Front Button"
                  style={{ width: "20px", height: "auto" }} // Adjust size as needed
                />
              </button>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '15px 0 5px' }}>
              <div style={{ width: '50%', borderRight: '1px solid white', textAlign: 'center' }}>
                600m away
              </div>
              <div style={{ width: '50%', textAlign: 'center' }}>
                <img
                  src={star} // Replace with the correct path
                  alt="Star"
                  style={{ width: "20px", height: "auto", marginBottom: "5px" }} // Adjust size as needed
                /> 4.9
              </div>
            </div>
          </div>
        </Card.Header>
      </div>
      <div className="content-below" style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* First Row of Cards */}
        <div className="card-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', marginBottom: '20px' }}>
          {/* Wrapper for both cards to help with centering */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: 'auto', gap: '20px' }}> {/* Adjust maxWidth as needed */}
            {/* Card and Name Wrapper for the First Card */}
            <div style={{ width: '150px', marginRight: '10px'}}>
              <div className="card" style={{
                position: 'relative',
                height: '150px',
                width: '100%', /* Use 100% of the parent div to control size */
                backgroundImage: `url(${tomatosoup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <button style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  backgroundColor: '#FFC218',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  border: 'none',
                }} onClick={() => handleAddToCart(1)} >
                  +
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>Tomato Soup Base</div>
            </div>

            {/* Card and Name Wrapper for the Second Card */}
            <div style={{ width: '150px' }}>
              <div className="card" style={{
                position: 'relative',
                height: '150px',
                width: '100%', /* Use 100% of the parent div to control size */
                backgroundImage: `url(${tomyumsoup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}>
                <button style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  backgroundColor: '#FFC218',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  border: 'none',
                }} onClick={() => handleAddToCart(4)} >
                  +
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>TomYum Soup Base</div>
            </div>
          </div>
        </div>
        {/* Second Row of Cards */}
        <div className="card-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: 'auto', gap: '20px' }}> 
          {/* Card and Name Wrapper for the First Card */}
          <div style={{ width: '150px', marginRight: '10px' }}>
              <div className="card" style={{
                position: 'relative',
                height: '150px',
                width: '150px', /* Use 100% of the parent div to control size */
                backgroundImage: `url(${malasoup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}>
                <button style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  backgroundColor: '#FFC218',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  border: 'none',
                }} onClick={() => handleAddToCart(2)} >
                  +
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>Mala Xiang Guo</div>
            </div>

            {/* Card and Name Wrapper for the Second Card */}
            <div style={{ width: '150px' }}>
              <div className="card" style={{
                position: 'relative',
                height: '150px',
                width: '150px', /* Use 100% of the parent div to control size */
                backgroundImage: `url(${mushroomsoup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}>
                <button style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-15px',
                  backgroundColor: '#FFC218',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  border: 'none',
                }} onClick={() => handleAddToCart(3)} >
                  +
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>Mushroom Base</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', marginTop: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={zlmltbottom} // Make sure this path is correctly pointing to your zlmltbottom.png image
        alt="ZLMLT Bottom"
        style={{ width: '100%', height: 'auto' }} // Adjust as needed
      />
    </div>
  </div>
  );
}

export default Restaurant;