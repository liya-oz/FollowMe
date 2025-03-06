import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/Logo"; 
import "../../assets/styles/Register.css";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", password: "" });
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
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <p className="link-text">
            Don't have an account?{" "}
            <Link to="/register" className="link-word">
              Register
            </Link>
          </p>

          <div className="divider">or</div>

          <button className="google-btn">
            <FcGoogle className="google-icon" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
