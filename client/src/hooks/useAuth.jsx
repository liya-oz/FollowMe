import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { authToken, login: contextLogin } = useContext(AuthContext);

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
      setError(err.message || "Something went wrong.");
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

  return { register, login, error, message, authToken };
};

export default useAuth;
