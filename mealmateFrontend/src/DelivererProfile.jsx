import React, { useEffect } from "react";
import user from "./assets/user.svg";
import next from "./assets/next.svg";
import "./style.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-page">
      <div className="card mb-3 mt-4 mx-3 p-4 border rounded-5" 
           style={{backgroundColor: '#34c759'}}>
        <div className="row g-0">
          <div className="col-9">
            <div className="card-body">
              <h4 className="card-title">Alex</h4>
              <p className="card-text pt-2">
                MealMate DELIVERY<small className="text-body-secondary"></small>
              </p>
              Joined in January 2024
            </div>
          </div>
          <div className="col-3 p-1 d-flex justify-content-end ">
            <img
              src={user}
              alt=""
              style={{ width: "90px", height: "auto", marginTop: "10px"}}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center m-3 p-2" >
        <button className="btn rounded-4 " 
                style={{backgroundColor: '#34c759'}}>
          Switch to Orderer
        </button>
      </div>

      <div className="container-fluid  mb-4 pb-4">
        <div className="row p-1 border-bottom">
          <h3>
            <b>My Account</b>
          </h3>
        </div>
        <div className="row p-1 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Past Shifts</p>
          </div>
          <div className="col-2 mx-3 px-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Qualifications</p>
          </div>
          <div className="col-2 mx-3 px-2 d-flex justify-content-end">
            <img src={next} alt="" style={{ width: "15px", height: "auto" }} />
          </div>
        </div>
        <div className="row p-2 border-bottom">
          <div className="col-8 m-1 pt-2">
            <p>Saved Places</p>
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
            <button className="btn btn-warning border rounded-4 "
            style={{backgroundColor: '#34c759'}} >
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
