import express from "express";
import {
  getUserPortfolio,
  buyStock,
  sellStock,
} from "../controllers/PortfolioController.js";

const router = express.Router();

router.get("/:userId", getUserPortfolio);
router.post("/buy", buyStock);
router.post("/sell", sellStock);

export default router;
