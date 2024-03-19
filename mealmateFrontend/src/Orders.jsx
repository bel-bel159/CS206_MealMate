import React from "react";
import { Link } from "react-router-dom";
import back from "./assets/back.svg";
import { useState, useEffect } from "react";

const Orders = () => {
  const [order, setOrder] = useState({
    delivererId: null,
    location: "",
    orderId: 0,
    orderItemsId: [],
    ordererId: "",
    status: "",
    totalPrice: 0,
  });

  useEffect(() => {
    // Replace with the correct orderer ID and your server's base URL
    const ordererId = "ben@gmail.com"; // As an example, it could be dynamic based on user session
    const url = `http://localhost:8080/orders/orderer/${ordererId}`;

    fetch(url, {
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
      .then((data) => {
        // If the backend response structure is as shown above
        console.log("Received order data: ", data);
        const orderData = data[0];
        setOrder({
          delivererId: orderData.delivererId,
          location: orderData.location,
          orderId: orderData.orderId,
          orderItemsId: orderData.orderItemsId, // This is an array of IDs
          ordererId: orderData.ordererId,
          status: orderData.status,
          totalPrice: orderData.totalPrice,
        });
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
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
      <div className="row mt-4 p-2 ">
        {" "}
        <h3>Current Order</h3>
      </div>

      <div className="container-fluid bg-warning m-2 p-2 border rounded-4 ">
        <div className="row m-2 p-2 ">
          <div className="col-2 m-2 pt-2 ">
            <button
              type="button"
              className="btn btn-light btn-lg border rounded-5"
            >
              {" "}
              x1
            </button>
          </div>
          <div className="col-6 m-2  pt-2">
            <h4>Order Items:</h4>
            <ul>
              {(order.orderItemsId || []).map((itemId, index) => (
                <li key={index}>Item ID: {itemId}</li> // Display each item ID
              ))}
            </ul>
          </div>
          <div className="col-2 m-2 pt-2">
            <p> $57.99</p>
          </div>
        </div>

        <div className="row m-2 border-bottom">
          <div className="col-8 m-2 pt-2">
            <p>Delivery Fees</p>
          </div>
          <div className="col-2 m-3 pt-2">
            <p> $2.00</p>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-8 m-2 ">
            <p>Total</p>
          </div>
          <div className="col-2 m-2 ">
            <p> ${order.totalPrice}</p>
          </div>
        </div>
        <div className="d-grid gap-2 p-1">
          <Link to="/track" className="btn btn-light" type="button">
            Track Order
          </Link>
        </div>
      </div>
      <div className="row mt-2 p-2 d-flex justify-content-start ">
        {" "}
        <h3>Past Orders</h3>
      </div>
      <div className="container-fluid m-2 p-2 bg-warning border rounded-4 ">
        <div className="row m-2 p-2  border-bottom">
          <div className="col-2 m-2 pt-2 ">
            <button
              type="button"
              className="btn btn-light btn-lg border rounded-5"
            >
              {" "}
              x1
            </button>
          </div>
          <div className="col-6 m-2  pt-3">
            <div className="">
              <h4> Pasta Express</h4>
            </div>
          </div>
          <div className="col-2 m-2 pt-3">
            <p> $7.60</p>
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
        <div className="row m-2">
          <p>12 Mar 2024, 12:55 pm</p>
        </div>
      </div>

      <div className="container-fluid m-3 p-3 bg-warning border rounded-4 ">
        <div className="row border-bottom m-2 p-2 ">
          <div className="col-2 m-2 pt-2 ">
            <button
              type="button"
              className="btn btn-light btn-lg border rounded-5"
            >
              {" "}
              x1
            </button>
          </div>
          <div className="col-6 m-2  pt-3">
            <div className="">
              <h4> Kuro Kare</h4>
            </div>
          </div>
          <div className="col-2 m-2 pt-3">
            <p> $8.90</p>
          </div>
        </div>

        <div className="row m-2 ">
          <div className="col-8 m-2 pt-1">
            <p>Total</p>
          </div>
          <div className="col-2 m-2 pt-1">
            <p> $9.90</p>
          </div>
        </div>
        <div className="row m-2">
          <p>8 Mar 2024, 4:34 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
