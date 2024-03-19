import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const ShowBottomNavbar = ({children}) => {
    const location = useLocation();
    if (location.pathname === "/cart") {
        return null;
    }
    const[showBottomNavBar, setShowBottomNavBar] = useState(false);
    useEffect(() => {
        console.log('this is location:', location)
        if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/notification' || location.pathname === '/orders' || location.pathname === '/checkout' || location.pathname === '/cart'){

            setShowBottomNavBar(false);
        }else{
            setShowBottomNavBar(true);
        }
    },[location]);

    
    return( 
        <div>{showBottomNavBar && children}</div>
    )
}
export default ShowBottomNavbar;