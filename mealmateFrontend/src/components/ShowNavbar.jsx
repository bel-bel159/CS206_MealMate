import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavbar = ({ children }) => {
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        const shouldShowNavbar = ["/", "/home"].includes(location.pathname);
        setShowNavBar(shouldShowNavbar);
    }, [location]);
    
    return (
        <div>{showNavBar && children}</div>
    );
};

export default ShowNavbar;