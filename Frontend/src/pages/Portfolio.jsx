import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BuySellForm from "../components/BuySellForm";
import "./Portfolio.css";
//for charts i have imported these after installing recharts(npm install recharts)
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // I have defined a color palette(🎨) for chart segments
  const COLORS = ["yellow", "red", "brown", "pink"];

  // 📊 Prepare data for Pie Chart: Investment value per stock
  const investmentData = portfolio.map((stock) => ({
    name: stock.symbol,
    value: stock.buyPrice * stock.quantity,
  }));
  // Prepare data for Bar Chart: Profit or Loss per stock
  const profitLossData = portfolio.map((stock) => ({
    name: stock.symbol,
    pl: (stock.currentPrice - stock.buyPrice) * stock.quantity,
  }));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        console.log("🟡 Decoded JWT:", decoded);

        setUserName(decoded.name || "Trader");

        // fetchPortfolio(userId);
        const extractedUserId = decoded.userId || decoded._id;
        if (!extractedUserId) {
          console.error("❌ No userId found in token");
          return;
        }
        setUserId(extractedUserId);
        fetchPortfolio(extractedUserId);
      } catch (err) {
        console.error("Invalid token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchLivePrice = async (symbol) => {
    try {
      const res = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: "K4M5G0DO3CDEXLRF",
        },
      });

      console.log("🔍 Full response for", symbol, res.data);

      const quote = res.data["Global Quote"];
      if (quote && quote["05. price"]) {
        return parseFloat(quote["05. price"]);
      }
      return null;
    } catch (err) {
      console.error(`❌ Error fetching live price for ${symbol}:`, err);
      return null;
    }
  };

  const fetchPortfolio = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/portfolio/${userId}`
      );
      const userStocks = res.data.stocks;

      const updatedStocks = await Promise.all(
        userStocks.map(async (stock) => {
          const livePrice = await fetchLivePrice(stock.symbol);
          console.log(`📈 Live price for ${stock.symbol}:`, livePrice);
          return {
            ...stock,
            currentPrice: livePrice || stock.buyPrice,
          };
        })
      );

      setPortfolio(updatedStocks);
    } catch (err) {
      console.error("❌ Failed to fetch portfolio", err);
      setPortfolio([]);
    }
  };

  // 💰 Total calculations based on real data
  const totalInvestment = portfolio.reduce(
    (total, stock) => total + stock.buyPrice * stock.quantity,
    0
  );

  const totalValue = portfolio.reduce(
    (total, stock) => total + stock.currentPrice * stock.quantity,
    0
  );

  const totalPL = totalValue - totalInvestment;

  return (
    <div className="portfolio-background">
      <div className="portfolio">
        <br />
        <h2>📁 {userName}'s Portfolio 📁</h2>

        <div>
          <h5>Total Investment: ₹{totalInvestment.toFixed(2)}</h5>
          <h5>Total Value: ₹{totalValue.toFixed(2)}</h5>
          <h5 className={totalPL >= 0 ? "text-primary" : "text-danger"}>
            Total {totalPL >= 0 ? "Profit" : "Loss"}: ₹{totalPL.toFixed(2)}
          </h5>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Buy Price (₹)</th>
                <th>Current Price (₹)</th>
                <th>Profit / Loss (₹)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock, idx) => {
                const pl =
                  (stock.currentPrice - stock.buyPrice) * stock.quantity;
                return (
                  <tr key={idx}>
                    <td>{stock.symbol}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.buyPrice}</td>
                    <td>{stock.currentPrice}</td>
                    <td className={pl >= 0 ? "text-success" : "text-danger"}>
                      {pl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <h4
            className="mb-4"
            style={{
              fontSize: "40px",
              backgroundColor: "aqua",
              color: "black",
              textAlign: "center",
            }}
          >
            🛒 Buy or Sell Stocks 🛒
          </h4>
          {userId && (
            <BuySellForm
              userId={userId}
              refreshPortfolio={() => fetchPortfolio(userId)}
            />
          )}
        </div>

        <div>
          <h4 className="mt-5">📊 Portfolio Distribution (Investment)</h4>
          <ResponsiveContainer width="50%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={investmentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {investmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h4 className="mt-5">📈 Profit / Loss per Stock</h4>
          <ResponsiveContainer width="75%" height={400}>
            <BarChart data={profitLossData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pl">
                {profitLossData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.pl >= 0 ? "Yellow" : "Red"} // Yellow for profit, Red for loss
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
