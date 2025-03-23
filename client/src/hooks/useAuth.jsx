import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const { authToken, login: contextLogin, logout } = useContext(AuthContext);

  const register = async (formData) => {
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: formData }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Registration failed");

      setMessage("Registration successful! Redirecting to login...");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const login = async (formData) => {
    setError(null);
    setMessage(null);

    try {
      const success = await contextLogin(formData);

      if (success) {
        setMessage("Login successful! Redirecting...");
        return true;
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      return false;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const id = profileData._id || (user ? user._id : null);
      if (!id) throw new Error("User ID is missing.");

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (data.success) {
        // Optionally, update the user in context if needed:
        setUser(data.data);
        return { success: true, message: "Profile updated successfully!" };
      } else {
        return {
          success: false,
          message: data.message || "Failed to update profile.",
        };
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: error.message };
    }
  };

  return { register, login, updateProfile, error, message, authToken, logout };
};

export default useAuth;
