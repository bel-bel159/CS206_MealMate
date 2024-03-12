import React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import home from "../Assets/home.svg";
import heart from "../Assets/heart.svg";
import user from "../Assets/user.svg";
import cart from "../Assets/cart.svg";
import { Link } from "react-router-dom";

export const BottomNavbar = () => {
    const [value, setValue] = React.useState(0);
    const handleNavigationChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <BottomNavigation sx={{width: "100%",
        position: "fixed",
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between'}}
         value={value} 
         onChange={handleNavigationChange}
        >
            <Link to="/">
                <BottomNavigationAction icon={<img src={home} alt="home" style={{ width: "30px", height: "auto" }} />} />
            </Link>
            <Link to="/cart">
                <BottomNavigationAction icon={<img src={cart} alt="cart" style={{ width: "30px", height: "auto" }} />} />
            </Link>
            <Link to="/favorites">
                <BottomNavigationAction icon={<img src={heart} alt="heart" style={{ width: "30px", height: "auto" }} />} />
            </Link>            
            <Link to="/profile">
                <BottomNavigationAction icon={<img src={user} alt="user" style={{ width: "30px", height: "auto" }} />} />
            </Link>
                   
        </BottomNavigation>
    )
}
