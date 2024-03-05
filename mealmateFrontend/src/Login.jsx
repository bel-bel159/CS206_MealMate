import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login d-flex justify-content-center align-tems-center 100-w vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h3 className="text-center">Login</h3>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div>
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label">
              {" "}
              Remember Me{" "}
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary"> Log in </button>
          </div>
          <p className="text-right">
            <a href="">Forgot Password</a> <Link to="/signup" className='ms-2'>Sign up</Link> 
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
