import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const ShowBottomNavbar = ({children}) => {
    const location = useLocation();
    if (location.pathname === "/cart") {
        return null;
    }
    const[showBottomNavBar, setShowBottomNavBar] = useState(false);
    useEffect(() => {
        // Determine if the current path is one of the paths that should show the navbar
        const shouldShowNavbar = ["/", "/home", "/profile", "/cart", "/track"].includes(location.pathname);
        setShowBottomNavBar(shouldShowNavbar);
    }, [location]);

    return( 
        <div>{showBottomNavBar && children}</div>
    )
}
export default ShowBottomNavbar;