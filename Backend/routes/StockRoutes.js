import express from "express";
import { getAllStocks } from "../controllers/StockController.js";
import Stock from "../models/StockModel.js";

const router = express.Router();
router.get("/getallstocks", getAllStocks);

export default router;
