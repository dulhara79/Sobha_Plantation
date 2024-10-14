// routes/financialTransactionRoutes.js
const express = require("express");
const {
  createFinancialTransaction,
  getFinancialTransactions,
  getFinancialTransaction,
  updateFinancialTransaction,
  deleteFinancialTransaction,
  getAllTransactionsSummary,
  getAllTimeBaseSummaries,
  getMonthlyIncomeExpenses,
  predictNextMonth
} = require("../../controllers/SalesAndFinance/financialTransactionController");
const {
  validate,
} = require("../../middleware/SalesAndFinance/validateMiddleware");
const {
  financialTransactionSchema,
} = require("../../validations/SalesAndFinance/FinancialTransactionValidation");

const router = express.Router();

router.post("/", createFinancialTransaction);
router.get("/", getFinancialTransactions);
router.get("/getAll-transactions-summary", getAllTransactionsSummary);
router.get("/:id", getFinancialTransaction);
router.put("/:id", updateFinancialTransaction);
router.delete("/:id", deleteFinancialTransaction);
router.get("/allsummary/summary", getAllTimeBaseSummaries);
router.get("/monthly-summary/incomeexpens", getMonthlyIncomeExpenses);
router.get("/summary/predict-next-month", predictNextMonth);

module.exports = router;
