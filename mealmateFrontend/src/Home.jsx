import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import promotion from './Assets/promotion.png';
import italian from './Assets/italian.png';
import chinese from './Assets/chinese.png';
import western from './Assets/western.png';
import thai from './Assets/thai.png';
import japanese from './Assets/japanese.png';
import korean from './Assets/korean.png';
import singaporean from './Assets/singaporean.png';
import vietnamese from './Assets/vietnamese.png';
import halal from './Assets/halal.png';

import nasiLemak from './Assets/nasiLemak.png';
import mcdonald from './Assets/mcdonald.png';
import pasta from './Assets/pasta.png';
import magnifyingGlass from './Assets/magnifyingGlass.svg';
import './Home.css';
import "./style.css";


// Promotion banner component
const Promotion = () => (
  <div className="promotion-banner">
    <img
      src={promotion}
      alt="Come home to prosperity"
      className="promotion-image"
    />
  </div>
);

const CuisineCategories = () => {
  // Settings for the slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Adjust based on how many items you want to show at once
    slidesToScroll: 1, // Adjust how many slides to scroll on swipe or click
    responsive: [
      {
        breakpoint: 768, // On mobile, you might want to show fewer items
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="cuisine-categories">
      <Slider {...settings}>
        <div className="icon-wrapper">
          <div><img src={italian} alt="Italian" />Italian</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={chinese} alt="Chinese" />Chinese</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={western} alt="Western" />Western</div>  
        </div>
        <div className="icon-wrapper">
          <div><img src={japanese} alt="Japanese" />Japanese</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={thai} alt="Thai" />Thai</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={singaporean} alt="Singaporean" />Singaporean</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={korean} alt="Korean" />Korean</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={vietnamese} alt="Vietnamese" />Vietnamese</div>
        </div>
        <div className="icon-wrapper">
          <div><img src={halal} alt="Halal" />Halal</div>
        </div>
      
      </Slider>
    </div>
  );
};

const PopularFoods = () => {
  return (
    <div className="popular-section">
      <h5 className="popular-title">Popular Foods</h5>
        <div className="popular-foods-container">
          <div className="popular-food-item">
            <div className="food-image-container">
              <img src={pasta} alt="Pasta Express" />
            </div>
          </div>
          <div className="popular-food-item">
            <div className="food-image-container">
              <img src={nasiLemak} alt="Ayam Taliwang" />
            </div>
          </div>
          <div className="popular-food-item">
            <div className="food-image-container">
              <img src={mcdonald} alt="McDonald's" />
            </div>
          </div>
        </div>
    </div>
  );
};

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

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ distance: 0, price: 0 });
  let navigate = useNavigate();

  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    // TODO: Apply these filters to your food items or restaurant listing
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

      <Promotion />

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

      <CuisineCategories />
      <PopularFoods />
    </div>
  );
  
}

export default Home;

