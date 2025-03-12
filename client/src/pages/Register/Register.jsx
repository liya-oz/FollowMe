import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/logo";
import useAuth from "../../hooks/useAuth";
import "../../styles/Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { register, error, message } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);

    if (success) {
      navigate("/login");
    }
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
                autoComplete="name"
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
                placeholder="Password"
                autoComplete="new-password"
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

          {error && <h3 className="error-message">{error}</h3>}
          {message && <h3 className="success-message">{message}</h3>}

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

export default Register;
