import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stocks: [
    {
      symbol: String,
      quantity: Number,
      buyPrice: Number,
      currentPrice: Number,
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
