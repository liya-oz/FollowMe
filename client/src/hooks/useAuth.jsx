import { useState } from "react";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const register = async (formData) => {
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
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
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      setMessage("Login successful! Redirecting...");
      return true;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      return false;
    }
  };

  return { register, login, error, message };
};

export default useAuth;
