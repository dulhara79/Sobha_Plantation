// routes/financialTransactionRoutes.js
const express = require("express");
const {
  createFinancialTransaction,
  getFinancialTransactions,
  getFinancialTransaction,
  updateFinancialTransaction,
  deleteFinancialTransaction,
} = require("../../controllers/SalesAndFinance/financialTransactionController");
const {
  validate,
} = require("../../middleware/SalesAndFinance/validateMiddleware");
const {
  financialTransactionSchema,
} = require("../../validations/SalesAndFinance/FinancialTransactionValidation");

const router = express.Router();

router
  .route("/")
  .get(getFinancialTransactions)
  .post(validate(financialTransactionSchema), createFinancialTransaction);

router
  .route("/:id")
  .get(getFinancialTransaction)
  .put(validate(financialTransactionSchema), updateFinancialTransaction)
  .delete(deleteFinancialTransaction);

module.exports = router;
