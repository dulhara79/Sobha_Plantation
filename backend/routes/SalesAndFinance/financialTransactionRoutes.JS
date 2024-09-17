// routes/financialTransactionRoutes.js
const express = require("express");
const {
  createFinancialTransaction,
  getFinancialTransactions,
  getFinancialTransaction,
  updateFinancialTransaction,
  deleteFinancialTransaction,
  getAllTransactionsSummary,
} = require("../../controllers/SalesAndFinance/financialTransactionController");
const {
  validate,
} = require("../../middleware/SalesAndFinance/validateMiddleware");
const {
  financialTransactionSchema,
} = require("../../validations/SalesAndFinance/FinancialTransactionValidation");

const router = express.Router();

// router
//   .route("/")
//   .get(getFinancialTransactions)
//   .post(/* validate(financialTransactionSchema), */ createFinancialTransaction)
//   .get(getAllTransactionsSummary);

// router
//   .route("/:id")
//   .get(getFinancialTransaction)
//   .put(validate(financialTransactionSchema), updateFinancialTransaction)
//   .delete(deleteFinancialTransaction);

router.post("/", createFinancialTransaction);
router.get("/", getFinancialTransactions);
router.get("/getAll-transactions-summary", getAllTransactionsSummary);
router.get("/:id", getFinancialTransaction);
router.put("/:id", updateFinancialTransaction);
router.delete("/:id", deleteFinancialTransaction);

module.exports = router;
