import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/Logo"; 
import "../../assets/styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="main-page">
      <div className="page-container">
        <Logo />

        <div className="form-box">
          <h2 className="title">Create an account</h2>
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
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
              Register
            </button>
          </form>

          <p className="link-text">
            Already have an account?{" "}
            <Link to="/login" className="link-word">
              Login
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

export default Register;
