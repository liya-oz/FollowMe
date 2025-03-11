import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken"),
  );
  const navigate = useNavigate();

  // Sync auth state with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !authToken) {
      console.log("Found token in localStorage:", storedToken);
      setAuthToken(storedToken);
    }
  }, []); // Runs only on mount

  // Redirect when authToken updates
  useEffect(() => {
    if (authToken) {
      console.log("User authenticated, redirecting to /discovery...");
      navigate("/discovery");
    }
  }, [authToken, navigate]);

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);

      const { token } = await response.json();
      console.log("Login successful! Received token:", token);

      localStorage.setItem("authToken", token);
      setAuthToken(token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    console.log("Logout initiated, clearing token...");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
