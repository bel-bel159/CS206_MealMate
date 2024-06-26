import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Notification from "./Notification.jsx";
import Navbar from "./components/Navbar.jsx";
import Restaurant from "./Restaurant.jsx";
import Cart from "./Cart.jsx";
import { BottomNavbar } from "./components/BottomNavbar.jsx";
import { DeliverBottomNavbar } from "./components/DeliverBottomNavbar.jsx";
import Profile from "./Profile.jsx";
import FilterResults from "./FilterResults.jsx"

import "bootstrap/dist/css/bootstrap.min.css";
import ShowNavbar from "./components/ShowNavbar.jsx";
import ShowBottomNavbar from "./components/ShowBottomNavBar.jsx";
import ShowDelivererBottomNavbar from "./components/ShowDeliverBottomNav.jsx";
import Checkout from "./Checkout.jsx";
import Orders from "./Orders.jsx";

import Track from "./Track.jsx";
import ConfirmOrder from "./ConfirmOrder.jsx";

import DelivererTrack from "./DelivererTrack.jsx";
import DelivererProfile from "./DelivererProfile.jsx";
import DelivererHome from "./DelivererHome.jsx";
import TakeOrder from "./TakeOrder.jsx";
import DelivererAllOrders from "./DelivererAllOrders.jsx"

import NotificationOrderCompleted from "./NotificationOrderCompleted.jsx";


function App() {

  return (
    <BrowserRouter>
      <ShowNavbar>
        <Navbar />
      </ShowNavbar>
      <ShowBottomNavbar>
        <BottomNavbar />
      </ShowBottomNavbar>
      <ShowDelivererBottomNavbar>
        <DeliverBottomNavbar />
      </ShowDelivererBottomNavbar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/restaurant" element={<Restaurant />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/filter-results" element={<FilterResults />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/track" element={<Track />}></Route>
        <Route path="/confirm" element={<ConfirmOrder />}></Route>
        <Route path="/deliverer-home" element={<DelivererHome />}></Route>
        <Route path="/deliver-track" element={<DelivererTrack />}></Route>
        <Route path="/takeorder" element={<TakeOrder />} />
        <Route path="/deliverer-profile" element={<DelivererProfile />} />
        <Route path="/deliverer-all-orders" element={<DelivererAllOrders />} />
        <Route path="/notification-order-completed" element={<NotificationOrderCompleted />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
