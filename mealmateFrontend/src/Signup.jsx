import React from "react";
import "./style.css";

function Signup() {
  return (
    <div className="Signup d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h3 className="text-center mb-4">Sign Up</h3>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email "
              placeholder="Enter Email"
              className="form-control rounded-4"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="username"
              placeholder="Enter Username"
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
          <div className="mb-3">
            <label htmlFor=" Confirm password" className="form-label">
              Confirm Password
            </label>
            <input
              type="Confirm password"
              placeholder="Confirm Password"
              className="form-control rounded-4"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-dark btn-lg">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
