import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/PrivateLayout.scss";

const PrivateLayout = () => {
  const { logout } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 870);
      if (window.innerWidth >= 870) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`private-layout ${isMobile ? "private-layout-mobile" : ""}`}
    >
      {isMobile ? (
        <button
          className="private-layout-hamburger-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "╳" : "☰"}
        </button>
      ) : (
        <Navbar logout={logout} />
      )}
      {menuOpen && <Navbar logout={logout} />}
      <div className="private-layout-content">
        <main className="private-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
