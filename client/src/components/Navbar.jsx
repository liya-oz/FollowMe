import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaCalendarAlt,
  FaPlus,
  FaUserFriends,
  FaCog,
} from "react-icons/fa";
import "../styles/Navbar.scss";

import PropTypes from "prop-types";

const NavbarItem = ({ icon, text, to }) => {
  return (
    <li className="navbar-item">
      <NavLink to={to} className="nav-link" activeClassName="active">
        {icon} <p>{text}</p>
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <img src="/logo.png" alt="FollowMe Logo" />
        </div>
        <nav>
          <ul>
            <NavbarItem
              icon={<FaHome className="nav-link-icon" />}
              text="Discovery"
              to="/discovery"
            />
            <NavbarItem
              icon={<FaCompass className="nav-link-icon" />}
              text="Explore"
              to="/explore"
            />
            <NavbarItem
              icon={<FaCalendarAlt className="nav-link-icon" />}
              text="My Events"
              to="/my-events"
            />
            <NavbarItem
              icon={<FaPlus className="nav-link-icon" />}
              text="Create Event"
              to="/create-event"
            />
            <NavbarItem
              icon={<FaUserFriends className="nav-link-icon" />}
              text="My Friends"
              to="/my-friends"
            />
          </ul>
        </nav>
      </div>
      <div className="navbar-bottom">
        <NavbarItem
          icon={<FaCog className="nav-link-icon" />}
          text="Settings"
          to="/settings"
        />
        <p>FollowMe 2025. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Navbar;
