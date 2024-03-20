import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";
import mealmateLogoYellow from "./Assets/mealmateLogoYellow.png";

function Signup() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); 

  const handleSignup = (event) => {
    event.preventDefault();

    // Add validation for passwords or any other fields if necessary
    const isEmailValid = (email) => {
      // Simple email regex for demonstration
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      return re.test(email.toLowerCase());
    };

    const isPasswordStrong = (password) => {
      // Example regex: at least one number, one lowercase and one uppercase letter, and at least 8 characters
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
      return re.test(password);
    };
    
    // Inside handleSignup function before setting userData
    if (!isEmailValid(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    
    if (!isPasswordStrong(password)) {
      alert("Password is not strong enough! Password should have at least one number, one lowercase, one uppercase letter, and at least 8 characters.");
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      email: email,
      name: name,
      password: password
    };

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      console.log('Response received:', response); // Logs the response object
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data); // This should log the data from the response body
      navigate('/login');
      const deliveryCartData = {
        ordererId: email, orderItemsId: [], totalPrice: 0
      };
      return fetch('http://localhost:8080/deliveryCarts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deliveryCartData)
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create delivery cart');
      }
      return response.json(); // Proceed with the next step after successfully creating the delivery cart
    })
    .then(deliveryCartData => {
      console.log('Delivery cart created successfully:', deliveryCartData);
      navigate('/login'); // Navigate to login page or any other page as needed
    })
    .catch(error => {
      console.error('Error during signup or delivery cart creation:', error);
      alert(error.message);
    });
  };


  return (
    <div className="Signup d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSignup}>
          <div className="d-flex justify-content-center align-items-center vh-20">
            <img
              src={mealmateLogoYellow}
              alt="LogoYellow"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email "
              placeholder="Enter Email"
              className="form-control rounded-4"
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <div className="text-danger">
                Invalid email. Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="name"
              placeholder="Enter Name"
              className="form-control rounded-4"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-4"
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor=" Confirm password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control rounded-4"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#FFC218' }}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
