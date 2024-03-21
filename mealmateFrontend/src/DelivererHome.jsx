import React, { useState, useEffect } from 'react';
import './style.css';
import './DelivererHome.css'; // Make sure to create a corresponding CSS file for styling

function DelivererHome() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async (itemId) => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/orderItems/${itemId}`; // Construct URL
      console.log("Fetching item details:", url); // Debugging: Log the URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP item error! status: ${response.status}`);
      }
      return response.json();
    };

    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetch('http://localhost:8080/orders/pendingorders');
        console.log("Fetching order details:", ordersResponse); // Debugging: Log the URL

        if (!ordersResponse.ok) {
          throw new Error(`HTTP order error! status: ${ordersResponse.status}`);
        }

        const text = await ordersResponse.text(); // Get the response body as text
        const pendingOrders = JSON.parse(text); // Try to parse it as JSON
            // const pendingOrders = await ordersResponse.json();
        console.log("JSON text", pendingOrders)

           // Loop through each order to fetch its items' details
        const ordersWithDetails = await Promise.all(pendingOrders.map(async (order) => {
            // Create a tally of itemIds to their counts
            const itemCounts = order.orderItemsId.reduce((acc, itemId) => {
            acc[itemId] = (acc[itemId] || 0) + 1;
            return acc;
            }, {});
    
            // Fetch the details of each unique item
            const uniqueItemIds = [...new Set(order.orderItemsId)];
            const itemsDetails = await Promise.all(uniqueItemIds.map(itemId => fetchItemDetails(itemId)));
    
            // Map the item details to names with counts
            const itemsWithCounts = itemsDetails.map(item => {
            const count = itemCounts[item.itemId];
            return `${item.itemName} x${count}`;
            }).join(', ');
    
            return {
            ...order,
            items: itemsWithCounts,
            };
        }));
  
      setOrders(ordersWithDetails);
    } catch (error) {
      console.error("There was an error fetching the orders or items:", error);
    }
        
    //     // Loop through each order to fetch its items' details
    //     const ordersWithDetails = await Promise.all(pendingOrders.map(async (order) => {
    //       const itemsDetails = await Promise.all(order.orderItemsId.map(itemId => fetchItemDetails(itemId)));
    //       return {
    //         ...order,
    //         items: itemsDetails.map(item => `${item.itemName}`).join(', '),
    //       };
    //     }));

    //     setOrders(ordersWithDetails);
    //   } catch (error) {
    //     console.error("There was an error fetching the orders or items:", error);
    //   }
    };

    fetchOrders();
  }, []);

  return (
    <div className="deliverer-home">
      <h3>Shift: 2.01pm-3.01pm</h3>
      <h2>List of Orders Near You</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-details">
            <h3>Zhang Liang Mala Tang</h3>
            <p>{order.location}</p>
            <p>Items: {order.items}</p>
          </div>
          <button className="take-order-btn">Take Order</button>
        </div>
      ))}
    </div>
  );
}

export default DelivererHome;
