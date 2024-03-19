import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const ShowNavbar = ({children}) => {
    const location = useLocation();

    const[showNavBar, setShowNavBar] = useState(false);
    useEffect(() => {
        console.log('this is location:', location)
        if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/notification' || location.pathname === '/track' || location.pathname === '/checkout'){
            setShowNavBar(false);
        }else{
            setShowNavBar(true);
        }
    },[location]);

    
    return( 
        <div>{showNavBar && children}</div>
    )
}
export default ShowNavbar;