import React, { useState } from "react";
import axios from "axios";

const BuySellForm = ({ userId, refreshPortfolio }) => {
  const [formData, setFormData] = useState({
    stockSymbol: "",
    quantity: "",
    buyPrice: "",
    type: "buy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stockSymbol" ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!formData.stockSymbol || !/^[A-Z]+$/.test(formData.stockSymbol)) {
      alert(
        "Please enter a valid stock symbol (e.g., AAPL, TSLA). Only uppercase letters allowed."
      );
      return;
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    if (
      formData.type === "buy" &&
      (!formData.buyPrice || Number(formData.buyPrice) <= 0)
    ) {
      alert("Please enter a valid buy price greater than 0.");
      return;
    }

    const endpoint =
      formData.type === "buy"
        ? "http://localhost:5000/api/portfolio/buy"
        : "http://localhost:5000/api/portfolio/sell";

    try {
      const res = await axios.post(endpoint, {
        userId,
        symbol: formData.stockSymbol,
        quantity: Number(formData.quantity),
        buyPrice: Number(formData.buyPrice),
      });

      alert(res.data.message);

      if (typeof refreshPortfolio === "function") {
        refreshPortfolio();
      }

      setFormData({
        stockSymbol: "",
        quantity: "",
        buyPrice: "",
        type: "buy",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error processing request");
    }
  };

  return (
    <div className="card p-2 shadow-lg rounded-xl w-96 m-auto row-6 col-6">
      <h2
        className="  text-center"
        style={{ color: "black", fontSize: "40px" }}
      >
        Buy/Sell Stocks
      </h2>
      <form onSubmit={handleSubmit} style={{ width: 10 }}>
        <select
          name="type"
          onChange={handleChange}
          value={formData.type}
          className="w-full p-3 mb-2 rounded"
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="text"
          name="stockSymbol"
          value={formData.stockSymbol}
          placeholder="Stock Symbol (e.g. AAPL)"
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded"
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            color: "black",
            width: "20",
          }}
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          placeholder="Quantity"
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded"
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            color: "black",
          }}
        />
        {formData.type === "buy" && (
          <input
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            placeholder="Buy Price"
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded"
            style={{
              fontSize: "20px",
              backgroundColor: "transparent",
              color: "black",
            }}
          />
        )}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          style={{ fontSize: "20px", width: "10" }}
        >
          {formData.type === "buy" ? "Buy Stock" : "Sell Stock"}
        </button>
      </form>
    </div>
  );
};

export default BuySellForm;
