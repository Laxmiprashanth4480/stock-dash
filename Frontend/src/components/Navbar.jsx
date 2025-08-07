import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
      <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: 30 }}>
        📊 StockDash 📊
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              style={{ color: "White", fontSize: 25 }}
            >
              <b>Home</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/login"
              style={{ color: "Red", fontSize: 25 }}
            >
              <b>Login</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/register"
              style={{ color: "Red", fontSize: 25 }}
            >
              <b>Register</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              style={{ color: "White", fontSize: 25 }}
            >
              <b>Dashboard</b>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
