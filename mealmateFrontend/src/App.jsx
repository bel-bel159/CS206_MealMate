import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Notification from "./Notification.jsx";
import Navbar from "./components/Navbar.jsx";
import Restaurant from "./Restaurant.jsx";
import Cart from "./Cart.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Checkout from "./Checkout.jsx";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/restaurant" element={<Restaurant />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
