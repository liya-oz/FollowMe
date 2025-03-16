import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "./contexts/AuthContext";

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken"),
  );
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const updateToken = useCallback((token) => {
    console.log("Updating auth token:", token);
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
    setAuthToken(token);
  }, []);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authToken) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          console.warn("Unauthorized request. Logging out...");
          logout();
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUserProfile();
  }, [authToken]);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    updateToken(storedToken);
    setIsLoading(false);
  }, [updateToken]);

  useEffect(() => {
    if (authToken && !isLoading) {
      const publicPaths = ["/", "/login", "/register"];
      if (publicPaths.includes(location.pathname)) {
        console.log("Auth token detected, navigating to /discovery...");
        navigate("/discovery");
      }
    }
  }, [authToken, navigate, location.pathname, isLoading]);

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);

      const data = await response.json();
      console.log("Login successful! Received token:", data.token);

      updateToken(data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    console.log("Logout initiated, clearing token...");
    updateToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login,
        logout,
        isLoading,
        user,
        setAuthToken: updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
