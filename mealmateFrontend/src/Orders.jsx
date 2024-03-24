import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "./assets/back.svg";
import css from "./Orders.css"; // Make sure to create a corresponding CSS file for styling

const Orders = () => {
  const orderId = localStorage.getItem('ordererTrackOrder') || 'No order found';
  const [order, setOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {

    // Replace with the correct orderer ID and your server's base URL

    fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });

    fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/orderitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(async (data) => {
          setOrderList(data);
        })
        .catch((error) => {
          console.error("Error fetching order list data:", error);
        });
  }, []);


  return (
    <div
      className="header bg-light"
      style={{
        width: "100%",
        height: "50px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "100%", height: "50px", position: "relative" }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            transform: "translateY(20%)",
          }}
        >
          <Link to="/">
            <img
              src={back}
              alt="Back"
              style={{ width: "35px", height: "auto" }} // Adjust size as needed
            />
          </Link>
        </button>
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "50%",
            transform: "translateY(-30%)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          My Orders
        </div>

        <div style={{ width: "30px" }}>
          {" "}
          {/* Placeholder for right-side symmetry, adjust as needed */}
        </div>
      </div>
      <div className=" p-2 mt-2 pt-2 ">
        {" "}
        <h3 className="current-order">Current Order</h3>
      </div>

      <div className="order-container bg-warning p-2 border rounded-4 ">
        {orderList.map((item, index) => (
        <div key={index} className="row m-1 p-2 align-items-center">
          <div className="col-8 m-2 pt-2">
            <h5>
              {item.itemName}
            </h5>
            {/* Adjust these fields based on your actual item details structure */}
          </div>
          <div className="col-2 m-2 pt-2">
            <h5>
              x{item.quantity}
            </h5>{" "}
            {/* Adjust these fields based on your actual item details structure */}
          </div>
        </div>
            ))}
        <div className="row m-2 border-bottom">
          <div className="col-8 m-2 pt-2">
            <p>Delivery Fees</p>
          </div>
          <div className="col-2 m-3 pt-2">
            <p> $1.00</p>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-8 m-2 ">
            <p>Total</p>
          </div>
          <div className="col-2 m-2 ">
            <p> ${order && order.totalPrice}</p>
          </div>
        </div>
        <div className="d-grid gap-2 p-1">
          <Link to="/track" className="btn btn-light" type="button">
            Track Order
          </Link>
        </div>
      </div>
      <div className="past-orders-title mb-0 mt-2 ">
        {" "}
        <h3 pb-0>Past Orders</h3>
      </div>
      <div className="order-container m-2 p-2 bg-warning border rounded-4 ">
        <div className="row m-2 p-2  border-bottom">
          <div className="">
            <h5> Cream Pasta with Bacon x1 </h5>
          </div>
        </div>

        <div className="row m-2">
          <div className="col-8 m-2 pt-1">
            <p>Total</p>
          </div>
          <div className="col-2 m-2 pt-1">
            <p> $8.60</p>
          </div>
        </div>
        <div className="row m-2 ">
          <p>12 Mar 2024, 12:55 pm</p>
        </div>
      </div>

      <div className="order-container m-2 p-2 bg-warning border rounded-4 ">
        <div className="row m-2 p-2  border-bottom">
          <div className="">
            <h5> Triplets Chocolate Waffle x1 </h5>
          </div>
        </div>

        <div className="row m-2">
          <div className="col-8 m-2 pt-1">
            <p>Total</p>
          </div>
          <div className="col-2 m-2 pt-1">
            <p> $3.60</p>
          </div>
        </div>
        <div className="row m-2 ">
          <p>12 Mar 2024, 12:55 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
