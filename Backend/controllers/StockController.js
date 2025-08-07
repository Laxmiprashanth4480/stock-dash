import Stock from "../models/StockModel.js";

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error("🔴 Stock fetch error:", error);
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};
