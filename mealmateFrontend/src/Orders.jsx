import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "./assets/back.svg";
import css from "./Orders.css"; // Make sure to create a corresponding CSS file for styling

const Orders = () => {
  const [order, setOrder] = useState({
    delivererId: null,
    location: "",
    orderId: 0,
    orderItemsId: [],
    ordererId: "",
    status: "",
    totalPrice: 0,
    itemsDetails: [], // This will now include counts
  });

  useEffect(() => {

    // Replace with the correct orderer ID and your server's base URL
    const ordererId = localstorage.getItem('userEmail') || 'No email found';
    const url = `${import.meta.env.VITE_API_BASE_URL}/orders/orderer/${ordererId}`;

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
      .then(async (data) => {
        const orderData = data[0];

        // Create a map to count occurrences of each itemId
        const itemCounts = orderData.orderItemsId.reduce((acc, itemId) => {
          acc[itemId] = (acc[itemId] || 0) + 1;
          return acc;
        }, {});

        // Fetch details for each unique item in the order
        const uniqueItemIds = [...new Set(orderData.orderItemsId)];
        const itemsDetailsPromises = uniqueItemIds.map((itemId) =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/orderItems/${itemId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .catch((error) =>
              console.error(
                "There was an error fetching the item details:",
                error
              )
            )
        );

        const itemsDetails = await Promise.all(itemsDetailsPromises);

        // Combine item details with counts
        const itemsWithDetailsAndCounts = itemsDetails.map((item) => ({
          ...item,
          count: itemCounts[item.itemId], // Ensure 'item.id' matches the property from your item details response
        }));

        setOrder((prevOrder) => ({
          ...prevOrder,
          ...orderData,
          itemsDetails: itemsWithDetailsAndCounts,
        }));
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
      <div className=" p-2 mt-2 pt-2 ">
        {" "}
        <h3 className="current-order">Current Order</h3>
      </div>

      <div className="order-container bg-warning m-2 p-2 border rounded-4 ">
        <div className="row m-1 p-2 ">
          {order.itemsDetails.map((item, index) => (
            <div key={index} className="col-12 m-2 pt-2">
              <h5>
                {item.itemName} x{item.count}: ${item.itemPrice}{" "}
              </h5>{" "}
              {/* Adjust these fields based on your actual item details structure */}
            </div>
          ))}
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
      <div className="past-orders-title">
        {" "}
        <h3>Past Orders</h3>
      </div>
      <div className="order-container m-2 p-2 bg-warning border rounded-4 ">
        <div className="row m-2 p-2  border-bottom">
          <div className="">
            <h5> Cream Pasta with Bacon x1 : $7.60</h5>
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
            <h5> Triplets Chocolate Waffle x1 : $2.60</h5>
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
