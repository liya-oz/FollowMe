import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

function Header() {
  const [selectedCity, setSelectedCity] = useState("Select your city");
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

  return (
    <header>
      {/* Logo Section */}
      <div>
        <img src="/logo.png" alt="FollowMe Logo" />
        <span>FollowMe</span>
      </div>

      {/* Search Bar */}
      <div>
        <FaSearch size={18} />
        <input type="text" placeholder="Search..." />
      </div>

      {/* City Dropdown */}
      <div>
        <button>
          <FaMapMarkerAlt size={18} /> {selectedCity}
        </button>
        <div>
          {cities.map((city, index) => (
            <div key={index} onClick={() => setSelectedCity(city)}>
              {city}
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Links */}
      <div>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>

      {/* Sign In Button */}
      <button>Sign In</button>
    </header>
  );
}

export default Header;
