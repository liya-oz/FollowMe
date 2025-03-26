import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

function Header({ setSearchQuery, cities, setSelectedCity }) {
  const [titleInput, setTitleInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleTitleSearch = (e) => {
    const value = e.target.value;
    setTitleInput(value);
    setSearchQuery(value);
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    setSelectedCity(value);
    if (value.trim() === "") {
      setShowCityDropdown(false);
    } else {
      setShowCityDropdown(true);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().startsWith(cityInput.toLowerCase()),
  );

  const handleCitySelect = (city) => {
    setCityInput(city);
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  const handleCityKeyDown = (e) => {
    if (e.key === "Enter") {
      if (filteredCities.length > 0) {
        handleCitySelect(filteredCities[0]);
      } else {
        setShowCityDropdown(false);
      }
    }
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
          placeholder="Search by event name..."
          value={titleInput}
          onChange={handleTitleSearch}
        />
      </div>
      <div className="right-section">
        <div className="city-search">
          <FaMapMarkerAlt size={18} />
          <input
            type="text"
            placeholder="Enter your city..."
            value={cityInput}
            onChange={handleCityInputChange}
            onKeyDown={handleCityKeyDown}
          />
          {showCityDropdown && cityInput && filteredCities.length > 0 && (
            <div className="dropdown-content">
              {filteredCities.map((city, index) => (
                <div key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to="/login" className="sign-in-button">
          Sign In
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

export default Header;
