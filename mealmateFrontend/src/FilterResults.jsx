
import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import nasiLemak from './Assets/nasiLemak.png';
import kurokare from './Assets/kurokare.png';
import teaparty from './Assets/teaparty.png';
import pasta from './Assets/pasta.png';
import magnifyingGlass from './Assets/magnifyingGlass.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const FilterModal = ({ show, onHide, onFilter }) => {
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);
  
    const handleFilter = () => {
      onFilter({ distance, price });
      onHide();
    };
  
    let navigate = useNavigate();
  
    const handleDone = () => {
      handleFilter(); // Assuming this applies the filter
      navigate('/filter-results'); // Navigate to the restaurant route
    };
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Distance: {distance} km</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Price: {'$'.repeat(price)}</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDone}>
            DONE
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

// Add this component inside your FilterResults component
const RestaurantList = () => {
    // Add more restaurant details as needed
    const restaurants = [
      { name: 'Pasta Express', image: pasta, rating: 4.6, time: '8 min', price: '$' },
      { name: 'Taliwang Nasi Lemak', image: nasiLemak, rating: 4.3, time: '5 min', price: '$' },
      { name: 'The Tea Party', image: teaparty, rating: 4.9, time: '3.5 min', price: '$' },
      { name: 'Kuro Kare', image: kurokare, rating: 2.5, time: '2 min', price: '$$' },
    
    ];

    const [likedRestaurants, setLikedRestaurants] = useState({});

    const toggleLike = (restaurantName) => {
      setLikedRestaurants(prevState => ({
        ...prevState,
        [restaurantName]: !prevState[restaurantName]
      }));
    };

    return (
        <div className="restaurant-list">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-item">
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-details">
                <h3>{restaurant.name}</h3>
                <div>Rating: {restaurant.rating}</div>
                <div>Time: {restaurant.time}</div>
                <div>Price: {restaurant.price}</div>
              </div>
              <div className="restaurant-like" onClick={() => toggleLike(restaurant.name)}>
                <FontAwesomeIcon icon={likedRestaurants[restaurant.name] ? fasHeart : farHeart} color={likedRestaurants[restaurant.name] ? 'red' : 'grey'} />
              </div>
            </div>
          ))}
        </div>
      );
  };

function FilterResults() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ distance: 0, price: 0 });
    let navigate = useNavigate();
  
    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);
    const handleApplyFilter = (newFilters) => {
      setFilters(newFilters);
    };
  
    const suggestions = [
      'Zhang Liang Mala Tang Bugis',
      'Zhang Liang Mala Tang Bencoolen',
      'Zhang Liang Mala Tang Orchard',
      'Zhang Liang Mala Tang near me',
    ];
  
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      if (event.target.value.length > 0) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
      // navigate to the selected restaurant's page if its bencoolen
      if (suggestion == 'Zhang Liang Mala Tang Bencoolen' || suggestion == 'Zhang Liang Mala Tang near me') {
        navigate(`/restaurant`);
      }
      
    };
  
    return (
      <div className="home-container">
        {/* ... possibly other code ... */}
        <div className="header mb-3">
          <div className="search-and-delivery-container">
            <div className="input-group rounded">
              <span className="input-group-text bg-warning border-0">
                <img src={magnifyingGlass} alt="Search" style={{ width: '24px', height: '24px' }} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for food"
                aria-label="Search for food"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding to register item clicks
                  setTimeout(() => setShowSuggestions(false), 100);
                }}
              />
            </div>
            {showSuggestions && (
              <ul className="list-group">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="delivery-address-container bg-warning rounded my-2 p-2 d-flex justify-content-between align-items-center">
            <span className="fw-bold">ADDRESS:</span>
            <span className="address-text flex-grow-1">SMU SCIS1 SR B1-01</span>
            <span className="edit-address-link ms-2 text-decoration-none text-primary">Edit</span>
          </div>
        </div>
  
        <div className="filter-btn-container d-flex justify-content-end">
          <button 
            className="btn btn-warning btn-sm" 
            onClick={handleShowFilter}>
            Filter
          </button>
        </div>

        <FilterModal
          show={showFilter}
          onHide={handleCloseFilter}
          onFilter={handleApplyFilter}
        />
        <RestaurantList/>
      </div>
    );
  }

  export default FilterResults;