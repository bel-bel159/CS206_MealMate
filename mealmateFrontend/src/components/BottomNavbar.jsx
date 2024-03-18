import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import home from "../assets/home.svg";
import heart from "../assets/heart.svg";
import user from "../assets/user.svg";
import receipt from "../assets/receipt.svg";
import { Link } from "react-router-dom";

export const BottomNavbar = () => {
  const [value, setValue] = React.useState(0);
  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
      value={value}
      onChange={handleNavigationChange}
    >
      <Link to="/">
        <BottomNavigationAction
          icon={
            <img
              src={home}
              alt="home"
              style={{ width: "30px", height: "auto" }}
            />
          }
        />
      </Link>
      <Link to="/orders">
        <BottomNavigationAction
          icon={
            <img
              src={receipt}
              alt="receipt"
              style={{ width: "30px", height: "auto" }}
            />
          }
        />
      </Link>

      <BottomNavigationAction
        icon={
          <img
            src={heart}
            alt="heart"
            style={{ width: "30px", height: "auto" }}
          />
        }
      />

      <Link to="/profile">
        <BottomNavigationAction
          icon={
            <img
              src={user}
              alt="user"
              style={{ width: "30px", height: "auto" }}
            />
          }
        />
      </Link>
    </BottomNavigation>
  );
};
