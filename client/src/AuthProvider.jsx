// THis file is for next aims:
//
// Holds the auth token (and could be extended to include expiration, user info, etc.)
//
// Provides helper methods to log in, log out, and eventually refresh tokens
//
// Wraps your application so that every component can access the authentication state

// It has a mock token.
//
//  How it works! When the app loads:

// It checks localStorage for an authToken and sets it in state.
// It simulates a token validation process.
// Once "validated," it removes the loading state.
// Login Process (Mocked for Now):

// The login function automatically assigns a mock token ("dummyToken123") if no token is provided.
// The token is stored in localStorage and in the state.
// The user is redirected to /discovery (a protected route).
// Logout Process:

// It removes the token from localStorage and clears state.
// It redirects the user back to the login page.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthProvider";

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken"),
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider mounted. Checking token...");
    console.log("Current authToken:", authToken);
    setLoading(false);
  }, [authToken]);

  // Mock login function (assigns a fake token)
  const login = (token = "dummyToken123") => {
    console.log("Login function called! Storing token:", token);
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    console.log("Token set! New authToken state:", token);
    return true; // Simulate successful login
  };

  const logout = () => {
    console.log("Logout function called! Clearing token...");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    console.log("Token cleared. Redirecting to /login");
    navigate("/login");
  };

  const value = { authToken, login, logout };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
