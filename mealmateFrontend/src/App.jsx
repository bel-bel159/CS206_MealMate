import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Notification from "./Notification.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/notifications" element={<Notification />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
