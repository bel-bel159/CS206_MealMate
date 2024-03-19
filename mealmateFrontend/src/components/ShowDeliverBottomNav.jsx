import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const ShowDelivererBottomNavbar = ({ children }) => {
    const location = useLocation();
    const [showDelivererBottomNavBar, setShowDelivererBottomNavBar] = useState(true);

    useEffect(() => {
        const hideOnRoutes = [
            '/cart', 
            '/checkout', 
            '/confirm', 
            '/filter-results', 
            '/home',
            '/login',
            '/notification',
            '/orders',
            '/profile',
            '/restaurant',
            '/signup',
            '/track',
            '/'
        ];

        // Show the bottom navbar on all pages except those listed in hideOnRoutes
        setShowDelivererBottomNavBar(!hideOnRoutes.includes(location.pathname));
    }, [location]);

    return <div>{showDelivererBottomNavBar ? children : null}</div>;
};

export default ShowDelivererBottomNavbar;