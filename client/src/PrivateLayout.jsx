// This component provides a common UI wrapper for all logged-in pages
// (header, navbar, footer, etc.).
// You can customize the navigation links as needed.

import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/discovery">Discovery</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/my-events">My Events</Link>
            </li>
            <li>
              <Link to="/my-friends">My Friends</Link>
            </li>
            <li>
              <Link to="/chats">Chats</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              {/* Our backend with user ID is available too. */}
              <Link to="/user/1">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 FollowMe</p>
      </footer>
    </div>
  );
};

export default PrivateLayout;
