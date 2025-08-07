import Portfolio from "../models/PortfolioModel.js";

//To get portfolio
export const getUserPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "No portfolio found for this user." });
    }
    res.json(portfolio);
  } catch (error) {
    console.error("🔴 Portfolio fetch error:", error);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

// Buy stock
export const buyStock = async (req, res) => {
  const { userId, symbol, quantity, buyPrice } = req.body;

  // validating stock symbol
  console.log("Received symbol:", symbol);

  if (!symbol || typeof symbol !== "string" || !/^[A-Z]+$/.test(symbol)) {
    return res.status(400).json({ message: "Invalid stock symbol" });
  }

  try {
    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      // Create new portfolio
      portfolio = new Portfolio({
        userId,
        stocks: [{ symbol, quantity, buyPrice, currentPrice: buyPrice }],
      });
    } else {
      const stock = portfolio.stocks.find((s) => s.symbol === symbol);

      if (stock) {
        // Update existing stock
        const totalCost = stock.quantity * stock.buyPrice + quantity * buyPrice;
        const newQuantity = stock.quantity + quantity;
        stock.buyPrice = totalCost / newQuantity;
        stock.quantity = newQuantity;
      } else {
        // Add new stock
        portfolio.stocks.push({
          symbol,
          quantity,
          buyPrice,
          currentPrice: buyPrice,
        });
      }
    }

    await portfolio.save();
    res.status(200).json({ message: "Stock bought successfully", portfolio });
  } catch (err) {
    console.error("Buy stock error:", err);
    res.status(500).json({ message: "Failed to buy stock" });
  }
};

//  Sell stock
export const sellStock = async (req, res) => {
  const { userId, symbol, quantity } = req.body;

  // Validating stock symbol
  console.log("Received symbol:", symbol);

  if (!symbol || typeof symbol !== "string" || !/^[A-Z]+$/.test(symbol)) {
    return res.status(400).json({ message: "Invalid stock symbol" });
  }

  try {
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ message: "No portfolio found" });
    }

    const stockIndex = portfolio.stocks.findIndex((s) => s.symbol === symbol);

    if (stockIndex === -1) {
      return res.status(404).json({ message: "Stock not found in portfolio" });
    }

    const stock = portfolio.stocks[stockIndex];

    if (stock.quantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity to sell" });
    }

    stock.quantity -= quantity;

    if (stock.quantity === 0) {
      portfolio.stocks.splice(stockIndex, 1);
    }

    await portfolio.save();
    res.status(200).json({ message: "Stock sold successfully", portfolio });
  } catch (err) {
    console.error("Sell stock error:", err);
    res.status(500).json({ message: "Failed to sell stock" });
  }
};
