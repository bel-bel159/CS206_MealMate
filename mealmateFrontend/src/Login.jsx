import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="Login d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h3 className="text-center mb-4">Welcome to MealMate</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-4"
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
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label htmlFor="check" className="form-check-label">
              Remember Me
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-dark btn-lg">Log in</button>
          </div>
          <p className="text-right mt-3 d-flex justify-content-between">
            <a href="#">Forgot Password</a>
            <Link to="/signup" className="btn btn-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
