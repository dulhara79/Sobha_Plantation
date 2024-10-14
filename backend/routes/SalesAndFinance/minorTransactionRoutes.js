const express = require("express");
const {
  createFinancialTransaction,
  getFinancialTransactions,
  getFinancialTransaction,
  updateFinancialTransaction,
  deleteFinancialTransaction,
} = require("../../controllers/SalesAndFinance/minorTransactionsControllers");

const router = express.Router();

router.post("/", createFinancialTransaction);
router.get("/", getFinancialTransactions);
router.get("/:id", getFinancialTransaction);
router.put("/:id", updateFinancialTransaction);
router.delete("/:id", deleteFinancialTransaction);

module.exports = router;