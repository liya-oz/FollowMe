import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

function Header({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("Select your city");

  const cities = [
    "Amsterdam",
    "Rotterdam",
    "The Hague",
    "Utrecht",
    "Eindhoven",
    "Groningen",
    "Tilburg",
    "Almere",
    "Breda",
    "Nijmegen",
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="FollowMe Logo" className="logo-image" />
      </div>
      <div className="search-bar">
        <FaSearch size={18} />
        <input
          type="text"
          placeholder="Search by event title..."
          value={inputValue}
          onChange={handleSearch}
        />
      </div>
      <div className="right-section">
        <div className="dropdown">
          <button>
            <FaMapMarkerAlt size={18} /> {selectedCity}
          </button>
          <div className="dropdown-content">
            {cities.map((city, index) => (
              <div key={index} onClick={() => setSelectedCity(city)}>
                {city}
              </div>
            ))}
          </div>
        </div>
        <Link to="/register" className="sign-in-button">
          Sign In
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default Header;
