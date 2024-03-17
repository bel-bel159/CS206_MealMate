import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mealmateLogoYellow from "./Assets/mealmateLogoYellow.png";
import "./style.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed with status: ' + response.status);
      }
      return response.text();
    })
    .then(data => {
      console.log('Login successful:', data);
      navigate('/home');
    })
    .catch(error => {
      console.error('Login error:', error);
    });
  };


  return (
    <div className="Login d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center align-items-center vh-20">
            <img
              src={mealmateLogoYellow}
              alt="LogoYellow"
              style={{ width: "200px", height: "auto" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label htmlFor="check" className="form-check-label">
              Remember Me
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#FFC218' }}>Log in</button>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="text-right mt-3 d-flex justify-content-between">
                  <a href="#">Forgot Password</a>
                  <Link to="/signup" className="btn btn-link">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
