// This component provides a common UI wrapper for all logged-in pages
// (header, navbar, footer, etc.).
// You can customize the navigation links as needed.

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/PrivateLayout.scss";

const PrivateLayout = () => {
  return (
    <div className="private-layout">
      <Navbar />
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
