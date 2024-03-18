import React from "react";
import "./style.css";
import backbutton from "./Assets/backbutton.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();

    // const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Sample Item", quantity: 1 },
    ]);

    const hasItemsInCart = cartItems.some(item => item.quantity > 0);

    // const addItemToCart = (newItem) => {
    //     // Check if the item already exists in the cart
    //     const itemExists = cartItems.find(item => item.id === newItem.id);
      
    //     if (itemExists) {
    //       // Increase quantity if item exists
    //       setCartItems(cartItems.map(item => 
    //         item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item
    //       ));
    //     } else {
    //       // Add new item with quantity = 1 if it doesn't exist
    //       setCartItems([...cartItems, {...newItem, quantity: 1}]);
    //     }
    // };

    return (
        <div className="header bg-light" style={{ width: "100%", height: "50px", boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", height: "50px", position: 'relative' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', transform: 'translateY(20%)'}}>
                    <img
                    src={backbutton}
                    alt="Back"
                    style={{ width: "30px", height: "auto" }} // Adjust size as needed
                    onClick={() => navigate(-1)}
                    />
                </button>
                <div style={{ position: 'absolute', width: "100%", top: '50%', transform: 'translateY(-30%)', textAlign: 'center' , fontWeight: 'bold'}}>
                    My Cart
                </div>
                {/* If you plan to add another element (like a cart icon) on the right, you can add it here. */}
                <div style={{ width: '30px' }}> {/* Placeholder for right-side symmetry, adjust as needed */}</div>
            </div>
            {hasItemsInCart ? (
                <div>
                {cartItems.filter(item => item.quantity > 0).map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                    {/* Quantity Card */}
                    <div style={{
                      padding: '10px 20px',
                      backgroundColor: '#FFC218',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginLeft: '10px'
                    }}>
                      x{item.quantity}
                    </div>
              
                    {/* Item Details */}
                    <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', paddingTop: '20px', marginBottom: '0px'}}>
                      <h4>Zhang Liang Mala Tang Bencoolen</h4>
                      <p>Tomato Soup Base</p>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold', fontSize: '20px' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '20px' }}>$ 10.00</h4>
                    </div>
                  </div>
                ))}
                {/* Horizontal Line */}
                <hr style={{ width: '100%', color: '#FFC218', marginTop: '10px' }} />
                {/* Checkout Button */}
                <button style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: '#FFC218',
                    borderRadius: '20px',
                    border: 'none',
                    fontWeight: 'bold',
                    position: 'absolute',
                    bottom: '80px',
                    left : '50%',
                    transform: 'translateX(-50%)'
                }} onClick={() => navigate('/checkout')}>
                    Checkout
                </button>
              </div>              
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                        There are currently no items in your basket.
                    </div>
                    <hr style={{ width: '100%', marginBottom: '20px', color: '#FFC218'}} />
                    <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#FFC218', borderRadius: '20px', border: 'none' }} 
                    onClick={() => navigate('/home')}>
                        Explore Options
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;