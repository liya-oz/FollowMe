import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaCalendarAlt,
  FaPlus,
  FaUserFriends,
  FaComments,
} from "react-icons/fa";
import "../styles/Navbar.scss";
import PropTypes from "prop-types";

const NavbarItem = ({ icon, text, to, closeMenu }) => {
  const handleClick = () => {
    if (closeMenu) closeMenu();
  };

  return (
    <li className="navbar-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        onClick={handleClick}
      >
        {icon} <p>{text}</p>
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  closeMenu: PropTypes.func,
};

const Navbar = ({ closeMenu }) => {
  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <img src="/logo.png" alt="FollowMe Logo" />
        </div>
        <nav className="navbar-nav">
          <ul>
            <NavbarItem
              icon={<FaHome className="nav-link-icon" />}
              text="Discovery"
              to="/discovery"
              closeMenu={closeMenu}
            />
            <NavbarItem
              icon={<FaCompass className="nav-link-icon" />}
              text="Explore"
              to="/explore"
              closeMenu={closeMenu}
            />
            <NavbarItem
              icon={<FaCalendarAlt className="nav-link-icon" />}
              text="My Events"
              to="/my-events"
              closeMenu={closeMenu}
            />
            <NavbarItem
              icon={<FaPlus className="nav-link-icon" />}
              text="Create Event"
              to="/create-event"
              closeMenu={closeMenu}
            />
            <NavbarItem
              icon={<FaUserFriends className="nav-link-icon" />}
              text="My Friends"
              to="/my-friends"
              closeMenu={closeMenu}
            />
            <NavbarItem
              icon={<FaComments className="nav-link-icon" />}
              text="Chats"
              to="/chats"
              closeMenu={closeMenu}
            />
          </ul>
        </nav>
      </div>
      <div className="navbar-bottom">
        <p className="bottom-text">FollowMe 2025. All rights reserved.</p>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  closeMenu: PropTypes.func,
};

export default Navbar;
