// src/components/TakeOrder.jsx

import React, { useState,useEffect} from 'react';
import './style.css'; // Make sure to create a corresponding CSS file
import location from './Assets/location.jpg';
import ordernumber from './Assets/1x.png';

// Function to fetch drop-off location data from an API
const fetchDropOffLocation = async (orderId) => {
    const url = `http://localhost:8080/orders/${orderId}/location`;
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Since you are expecting a plain string, use response.text()
      const locationText = await response.text();
      return locationText; // Returns the location as a plain string
  
    } catch (error) {
      console.error('Error fetching drop-off location:', error);
      return null;
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}/orderitems`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the response is JSON containing an array of item IDs
      const orderItemsDetails = await response.json();
      return orderItemsDetails;
  
    } catch (error) {
      console.error('Error fetching order items:', error);
      return null;
    }
  };
  

const TakeOrder = () => {
    const [dropOffAddress, setDropOffAddress] = useState('');
    const [orderItemsDetails, setOrderItemsDetails] = useState([]);
    useEffect(() => {
        // Retrieve orderId from local storage
        const orderId = "1"//localStorage.getItem('orderId'); // Make sure 'orderId' matches the key you used to store
    
        const loadDropOffLocation = async () => {
            const locationText = await fetchDropOffLocation(orderId);
          if (locationText) {
            setDropOffAddress(locationText); // Set the plain string directly to your state
          } 
        };

        const loadOrderItems = async () => {
            const itemDetails = await fetchOrderItems(orderId);
          if (itemDetails) {
            setOrderItemsDetails(itemDetails); // Set the array directly to your state
          }
        };
        
        loadDropOffLocation();
        loadOrderItems();
      }, []); // The empty dependency array means this effect runs only once on mount
    

    return (
      <div className="container my-4">
        <div className="row">
            <div className="col">
                <h1 className="text-center">Zhang Liang MalaTang</h1>
            </div>
        </div>
        <div className="row">
            <div className="col p-4">
                <div className="card w-100 rounded-5 p-4" style={{ backgroundColor:"#3CAD7E" }}>
                    <div className="card w-100 rounded-5 p-4" style={{ backgroundColor:"#fff" }}>
                        <div className="row">
                            <h2 className="card-title">Delivery</h2>
                        </div>
                        <div className= "row">
                            <div className="delivery-subcomment">Drop off in 10min</div>
                        </div>
                        <div className = "row">
                            <div className="card w-100 rounded-5 p-2" style={{ backgroundColor:"#A4E5CA" }}>
                                <div className = "row">
                                    <div className='col-1'></div>
                                    <div className="col-auto">
                                        <div className="orderid-item">ORDER ID:</div>
                                        
                                    </div>
                                    <div className="col">
                                        <div className="orderid-item">1</div>
                                    </div>
                                    <div className="col">

                                    </div>
                                </div>
                                <div className = "row p-2">
                                    <div className = "col-3 d-flex align-items-center">
                                        <div><img src={location} alt="location" className="img-fluid"/></div>
                                    </div>
                                    <div className="col">
                                        <div className = "row w-80">
                                            <div className="order-heading">PICK UP ORDER</div>
                                            
                                        </div>
                                        <div className = "row w-80">
                                            <div className="order-item">9 Bras Basah Rd, #01-02</div>
                                        
                                        </div>
                                        <div className = "row w-60">
                                            <div className="order-item">Rendezvous Hotel, 189559</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className = "col-3 d-flex align-items-center">
                                        <div><img src={location} alt="location" className="img-fluid"/></div>
                                    </div>
                                    <div className="col">
                                        <div className = "row w-80">
                                            <div className="order-heading">DROP OFF ORDER</div>
                                        </div>
                                        <div className = "row w-80">
                                            <div className="order-item">{dropOffAddress} </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className = "row p-2">
                                        <div className ="comment-item">COMMENT: Please bring it to the doorstep</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div className="row">
            <div className="col p-4">
                <div className="card w-100 rounded-5 p-4" style={{ backgroundColor:"#3CAD7E" }}>
                    <div className="card w-100 rounded-5 p-4" style={{ backgroundColor:"#fff" }}>
                        <div className="row">
                            <h2 className="card-title">Order</h2>
                        </div>
                        <div className = "row">
                            <div className="card w-100 rounded-5 p-2" style={{ backgroundColor:"#A4E5CA" }}>
                                <div className = "row">
                                    <div className='col-1'></div>
                                    <div className="col-auto">
                                        <div className="orderid-item">ORDER ID:</div>
                                    </div>
                                    <div className="col">
                                        <div className="orderid-item">1</div>
                                    </div>
                                    <div className="col">

                                    </div>
                                </div>
                                <div className = "row">
                                        <div className='col-1'></div>
                                        <div className="col-auto">
                                            <div className="orderid-item">Order Summary</div>
                                        </div>
                                </div>
                                <div className="row p-2">
                                    <div className = "col-3 d-flex align-items-center">
                                        <div><img src={ordernumber} alt="ordernumber" className="img-fluid"/></div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                        <h2 className="order-heading">MalaTang</h2>
                                        </div>
                                        <div className="row">
                                        {orderItemsDetails.map((itemDetail, index) => (
                                            <div key={index} className="row">
                                                <div className="order-item col-12">{itemDetail.itemName} - Quantity: {itemDetail.quantity}</div>
                                            </div>
                                        ))}
                                        
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className="btn btn-primary">Confirm Take Order</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default TakeOrder;
  