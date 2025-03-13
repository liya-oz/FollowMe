// This component provides a common UI wrapper for all logged-in pages
// (header, navbar, footer, etc.).
// You can customize the navigation links as needed.

import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import "./styles/PrivateLayout.scss";

const PrivateLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="private-layout">
      <Navbar logout={logout} />

      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
