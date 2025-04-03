import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles/PrivateLayout.scss";

const PrivateLayout = () => {
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const mobileLogoClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className={`private-layout ${menuOpen ? "menu-open" : ""}`}>
      <div className="desktop-navbar">
        <Navbar logout={logout} />
      </div>

      <div className="mobile-navbar">
        <div className="mobile-navbar-logo" onClick={() => mobileLogoClick()}>
          <img className="mobile-logo" src="/logo.png" alt="logo" />
        </div>
        <button
          className="private-layout-hamburger-menu"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <FaTimes className="hamburger-icon close" />
          ) : (
            <FaBars className="hamburger-icon" />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <Navbar logout={logout} closeMenu={() => setMenuOpen(false)} />
        </div>
      )}

      <div className="private-layout-content">
        <main className="private-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
