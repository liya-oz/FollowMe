import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import arrowDownIcon from "../assets/icons/arrow-down.svg";
import defaultUserIcon from "../assets/icons/user-icon.png";
import logoutIcon from "../assets/icons/logout.png";
import "../styles/discovery-header.scss";
import useAuth from "../hooks/useAuth";
function DiscoveryHeader({ setSearchQuery, cities, setSelectedCity }) {
  const { user } = useContext(AuthContext);
  const { logout } = useAuth();
  const [titleInput, setTitleInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleSearch = (e) => {
    const value = e.target.value.trim();
    setTitleInput(value);
    setSearchQuery(value.length > 1 ? value : "");
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value.trim();
    setCityInput(value);

    const filteredCities = cities.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase()),
    );

    setShowCityDropdown(value !== "" && filteredCities.length > 0);
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
    if (e.key === "Enter" && filteredCities.length > 0) {
      handleCitySelect(filteredCities[0]);
    }
  };

  return (
    <header className="header-container">
      <div className="search-container">
        <div className="search-bar">
          <FaSearch size={18} />
          <input
            type="text"
            placeholder="Search by event name..."
            value={titleInput}
            onChange={handleTitleSearch}
          />
        </div>

        <div className="city-search">
          <FaMapMarkerAlt size={18} />
          <input
            type="text"
            placeholder="Enter your city..."
            value={cityInput}
            onChange={handleCityInputChange}
            onKeyDown={handleCityKeyDown}
          />
          {showCityDropdown && filteredCities.length > 0 && (
            <div className="city-dropdown-content show">
              {filteredCities.map((city, index) => (
                <div key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user && (
        <div className="account-box">
          <div className="profile-circle">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="User Avatar"
                className="profile-image"
              />
            ) : (
              <img
                src={defaultUserIcon}
                alt="Default User"
                className="default-icon"
              />
            )}
          </div>

          <div className="user-content">
            <div className="name-container">
              <span className="user-name">{user.name || "User"}</span>
              <img
                src={arrowDownIcon}
                alt="Dropdown Icon"
                className={`arrow-icon ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
              <p className="user-email">{user.email || "No Email"}</p>
              <button className="logout-button" onClick={logout}>
                <img
                  src={logoutIcon}
                  alt="Logout Icon"
                  className="logout-icon"
                />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

DiscoveryHeader.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

export default DiscoveryHeader;
