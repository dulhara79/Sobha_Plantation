// routes/financeRoutes.js

const express = require("express");
const {
  getMonthlyAnalytics,
  getYearlySalesAnalytics,
  getWeeklyProductPerformance,
  getTransactions,
  getSummary,
  getBalanceSheet,
  getCashbook,
  getFinancialSummary
} = require("../../controllers/SalesAndFinance/FinancialAnalyticsController");

const router = express.Router();

// router.get("/monthly-analytics", getMonthlyAnalytics);
// router.get("/yearly-sales", getYearlySalesAnalytics);
// router.get("/product-performance", getWeeklyProductPerformance);

// Route to get all transactions
router.get("/transactions", getTransactions);

// Route to get summary cards data
router.get("/summary", getSummary);

// Route to get balance sheet data
router.get("/balance-sheet", getBalanceSheet);

// Route to get cashbook data
router.get("/cashbook", getCashbook);

router.get('/finance-summary', getFinancialSummary);

module.exports = router;
