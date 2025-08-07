import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import GlobalIndexCards from "../components/GlobalIndexCards";
import "./Dashboard.css";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  // // Dummy stock data
  // const stocks = [
  //   { symbol: "AAPL", name: "Apple Inc.", price: 191.24, change: "+1.2%" },
  //   { symbol: "GOOGL", name: "Alphabet Inc.", price: 2830.15, change: "-0.5%" },
  //   { symbol: "TSLA", name: "Tesla, Inc.", price: 726.94, change: "+3.8%" },
  //   { symbol: "INFY", name: "Infosys Ltd", price: 1420.00, change: "+0.6%" },
  // ];

  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "Trader");
      } catch (err) {
        console.error("Invalid token");
        navigate("/login");
      }
    }
    // Fetch stocks after auth check
    fetchStocks();
  }, [navigate]);

  const fetchStocks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getallstocks");
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.includes(searchTerm)
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // removes authentication
    window.location.href = "/login"; // force redirect and refresh
  };

  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        <br />
        <div className="clock">
          🕒 {currentTime.toLocaleDateString()} |{" "}
          {currentTime.toLocaleTimeString()}
          <div id="h1">
            <Link to="/portfolio" className="nav-btn">
              👨‍🎓 Go to Portfolio 👩‍🎓
            </Link>
          </div>
        </div>
        <div className="dashboard-header">
          <marquee behavior="scroll" direction="left" scrollamount="35">
            <h2 className="welcome-text">
              👋🎉 Welcome to {userName}'s Dashboard! 🚀📊
            </h2>
          </marquee>
        </div>

        <h4 className="section-title">🌐 Global Market Indices 🌐</h4>
        <GlobalIndexCards />
        <h4 className="section-title">📈 Market Overview 📈</h4>
        <br />
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search stock by symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />
        <div className="stock-grid">
          {filteredStocks.map((stock, index) => (
            <div key={index} className="stock-card">
              <h5>
                {stock.symbol} - {stock.name}
              </h5>
              <p>Price: ₹{stock.price}</p>
              <p className={stock.change.includes("-") ? "loss" : "profit"}>
                Change: {stock.change}
              </p>
            </div>
          ))}
        </div>

        <hr style={{ border: "3px dashed white ", margin: "20px 0" }} />

        <div className="card watchlist">
          <h5>👀 Watchlist 👀</h5>
          <ul>
            <li>
              <span>🟢 AAPL</span>
              <span>₹191.24</span>
            </li>
            <li>
              <span>🔴 TSLA</span>
              <span>₹726.94</span>
            </li>
            <li>
              <span>🟢 INFY</span>
              <span>₹1478.30</span>
            </li>
          </ul>
        </div>

        <div className="card market-news">
          <h5>📰 Market News 📰</h5>
          <ul>
            <li>📈 Sensex jumps 200 pts led by IT and banking stocks.</li>
            <li>📉 Oil prices drop amid global supply concerns.</li>
            <li>💸 RBI may hike repo rate next quarter: Analysts.</li>
            <li>🔔 TCS announces 2nd quarter earnings, stock surges 4%.</li>
          </ul>
        </div>
      </div>

      <div className="footer2">
        <Link to="/contact" className="nav-btn2">
          📞 Contact Us 📞
        </Link>
        <p className="p1">
          © 2025 Stock Dashboard | Built with React & Node.js
        </p>
        <button onClick={handleLogout} className="nav-btn3">
          👋 Logout 👋
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
