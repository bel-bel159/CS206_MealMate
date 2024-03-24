import React, { useEffect } from "react";
import user from "./assets/user.svg";
import next from "./assets/next.svg";
import "./style.css";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const HandleSwitch = () => {
    localStorage.setItem('delivererEmail', localStorage.getItem('userEmail'));
    localStorage.removeItem('userEmail');
    navigate('/deliverer-profile');
  };
  return (
    <div className="profile-page">
      <div className="card mb-3 mt-4 text-bg-warning mx-3 p-4 border rounded-5">
        <div className="row g-0">
          <div className="col-9">
            <div className="card-body">
              <h4 className="card-title">Javier</h4>
              <p className="card-text pt-2">
                MealMate LITE<small className="text-body-secondary"></small>
              </p>
              <p className="card-text">
                Upgrade to MealMate PRO
                <small className="text-body-secondary"></small>
              </p>
            </div>
          </div>
          <div className="col-3 p-1 d-flex justify-content-end ">
            <img
              src={user}
              alt=""
              style={{ width: "90px", height: "auto", marginTop: "20px" }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center m-3 p-2">
        <button className="btn btn-warning border rounded-4 "
                onClick={HandleSwitch}>
          Switch to Deliverer
        </button>
      </div>

      <div className="container-fluid mealmate-bg-colour-mute  mb-4 pb-4">
        <div className="row p-1 border-bottom">
          <h3>
            <b>My Account</b>
          </h3>
        </div>
        <div className="row p-1 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Payment Methods</p>
          </div>
          <div className="col-2 mx-3 px-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Vouchers</p>
          </div>
          <div className="col-2 mx-3 px-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Register as Student Deliverer</p>
          </div>
          <div className="col-2 mx-3 px-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>

        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Update Profile</p>
          </div>
          <div className="col-2 mx-3 p-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>

        <div className="row p-2 border-bottom">
          <h3>
            <b>General</b>
          </h3>
        </div>

        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Help center</p>
          </div>
          <div className="col-2 mx-3 p-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Settings</p>
          </div>
          <div className="col-2 mx-3 p-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Language</p>
          </div>
          <div className="col-2 mx-3 p-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Share feedback</p>
          </div>
          <div className="col-2 mx-3 p-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        
        <div className="d-flex justify-content-center m-3 p-2">
            <Link to="/login">
            <button className="btn btn-warning border rounded-4 " >
              Log Out
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
