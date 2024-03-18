import React from "react";
import { Link } from "react-router-dom";
import back from "./assets/back.svg";
import { useState, useEffect } from "react";

const Orders = () => {
  const [order, setOrder] = useState({
    quantity: 1,
    itemName: "Zhang Liang Mala Tang",
    itemPrice: 12,
  });

  useEffect(() => {
    // Replace '/api/orders/current' with the actual endpoint
    fetch("http://localhost:8080/orderitems/1")
      .then((response) => {
        // Clone the response stream to be able to read it twice
        const responseClone = response.clone();
        // Log the string response
        responseClone
          .text()
          .then((text) => console.log("String response:", text));
        // Proceed with parsing the response as JSON
        return response.json();
      })
      .then((data) => {
        console.log("JSON response:", data);
        setOrder({
          quantity: data.quantity,
          itemName: data.itemName,
          itemPrice: data.itemPrice,
        });
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []); // The empty array causes this effect to only run once
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
            <button type="button" class="btn btn-light btn-lg border rounded-5">
              {" "}
              x{order.quantity}
            </button>
          </div>
          <div className="col-6 m-2  pt-2">
            <div className="">
              <h4> {order.itemName}</h4>
            </div>
          </div>
          <div className="col-2 m-2 pt-2">
            <p> ${order.itemPrice.toFixed(2)}</p>
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
            <p> $14.00</p>
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
            <button type="button" class="btn btn-light btn-lg border rounded-5">
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
            <button type="button" class="btn btn-light btn-lg border rounded-5">
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
