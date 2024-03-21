import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowDelivererBottomNavbar = ({ children }) => {
    const location = useLocation();
    const [showDelivererBottomNavBar, setShowDelivererBottomNavBar] = useState(true);

    useEffect(() => {
        // Determine if the current path is one of the paths that should show the deliverer's navbar
        const shouldShowNavbar = ["/deliverer-home", "/deliverer-profile", "/deliverer-all-orders"].includes(location.pathname);
        setShowDelivererBottomNavBar(shouldShowNavbar);
    }, [location]);    

    return <div>{showDelivererBottomNavBar ? children : null}</div>;
};

export default ShowDelivererBottomNavbar;
