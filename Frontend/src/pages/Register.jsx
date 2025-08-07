import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", form);
      alert("Registration Successfull ☺️");
      navigate("/login"); //redirects to login page
    } catch (error) {
      alert(error.response?.data?.error || "Registration Failed 😞");
    }
  };
  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card row g-0 shadow-lg">
        {/* Left Side - Background + Text */}
        <div className="col-md-6 left-side">
          <div className="overlay-text">
            <h1>“Every stock has a story. Ready to write yours?”</h1>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="col-md-6 form-side p-5">
          <h3 className="mb-3 fw-bold">Register Now</h3>
          <p className="small">
            Don't have an account? <a href="/register">Create your account</a>,
            it takes less than a minute
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              placeholder="NAME"
              onChange={handleChange}
              required
            />
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
              className="form-control mb-2"
              name="password"
              placeholder="PASSWORD"
              onChange={handleChange}
              required
            />

            <button className="btn btn-danger w-100 mb-3">REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
