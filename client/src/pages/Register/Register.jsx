import { useState } from "react";
import "./Register.css";

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
    console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo">
          <h1>FOLLOWME</h1>
        </div>

        <div className="register-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
