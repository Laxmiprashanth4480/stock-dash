import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import StockRoutes from "./routes/StockRoutes.js";
import PortfolioRoutes from "./routes/PortfolioRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//test routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

//routes
app.use("/", UserRoutes);
app.use("/", StockRoutes);
app.use("/api/portfolio", PortfolioRoutes);
app.use("/api/contact", ContactRoutes);

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅MongoDB connected"))
  .catch((err) => console.log("❌MongoDB connection failed", err));

// Let's start our server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
