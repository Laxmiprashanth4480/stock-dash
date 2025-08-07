import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card row g-0 shadow-lg">
        {/* Left Side */}
        <div className="col-md-6 left-side">
          <div className="overlay-text">
            <h4>
              Track your stocks, manage your portfolio, and invest smartly.
            </h4>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 form-side p-5">
          <h3 className="mb-3 fw-bold">Login</h3>
          <p className="small">
            Don't have an account? <a href="/register">Create your account</a>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              name="email"
              placeholder="EMAIL ID"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              name="password"
              placeholder="PASSWORD"
              onChange={handleChange}
              required
            />
            <button className="btn btn-danger w-100 mb-3">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
