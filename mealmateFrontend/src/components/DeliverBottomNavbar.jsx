import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import home from "../assets/home.svg";
import calendar from "../assets/calendar.png";
import user from "../assets/user.svg";
import moneyicon from "../assets/moneyicon.png";
import { Link } from "react-router-dom";

export const DeliverBottomNavbar = () => {
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
      onChange={(event, newValue) => handleNavigationChange(event, newValue)}
    >
      {/* Correctly integrate Link with BottomNavigationAction */}
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<img src={home} alt="home" style={{ width: "30px", height: "auto" }} />}
        component={Link}
        to="/deliverer-home"
      />
      <BottomNavigationAction
        label="Orders"
        value="orderSummary"
        icon={<img src={calendar} alt="calendar" style={{ width: "30px", height: "auto" }} />}
        component={Link}
        to="/deliverer-all-orders"
      />
      <BottomNavigationAction
        label="Earnings"
        value="earning"
        icon={<img src={moneyicon} alt="moneyicon" style={{ width: "30px", height: "auto" }} />}
        component={Link}
        to="/earning"
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<img src={user} alt="user" style={{ width: "30px", height: "auto" }} />}
        component={Link}
        to="/deliverer-profile"
      />
    </BottomNavigation>
  );
};
