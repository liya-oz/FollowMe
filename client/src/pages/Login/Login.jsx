import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/logo";
import socket from "../../socket";
import useAuth from "../../hooks/useAuth";
import "../../styles/Register.scss";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { authToken, login, error, message } = useAuth();

  useEffect(() => {
    if (authToken) {
      console.log("Auth token detected, navigating to /discovery...");
      navigate("/discovery");
      socket.connect();
    }
  }, [authToken, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login button clicked! Form data:", formData);

    const success = await login(formData);
    if (!success) {
      console.log("Login failed. No token set or invalid credentials.");
    }
  };

  return (
    <div className="main-page">
      <div className="page-container">
        <Logo />
        <div className="form-box">
          <h2 className="title">Login to your account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Insert your email"
                autoComplete="email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Insert your password"
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          {error && <h3 className="error-message">{error}</h3>}
          {message && <h3 className="success-message">{message}</h3>}
          <p className="link-text">
            You do not have an account?{" "}
            <Link to="/register" className="link-word">
              Register
            </Link>
          </p>
          <div className="divider">or</div>

          <button className="google-btn">
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
