import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Private pages
import DiscoveryPage from "./pages/DiscoveryPage/DiscoveryPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import MyEvents from "./pages/MyEvents/MyEvents";
import EventDetails from "./pages/EventDetails/EventDetails";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import MyFriends from "./pages/MyFriends/MyFriends";
import Chats from "./pages/Chats/Chats";
import Settings from "./pages/Settings/Settings";
import UserProfile from "./pages/UserProfile/UserProfile";

// Layout for logged-in users (includes header/navbar, footer.)
import PrivateLayout from "./PrivateLayout";

// Component that checks for authentication and renders nested routes
import PrivateRoute from "./components/PrivateRoute";

import "./styles/global.scss";

// AuthProvider wraps the whole app to provide authentication state and helper functions
import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes for everyone */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes only for authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-friends" element={<MyFriends />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
