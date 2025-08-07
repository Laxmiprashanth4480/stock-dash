import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  change: String,
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
