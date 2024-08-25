const express = require("express");
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../../controllers/SalesAndFinance/InvoiceModelController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { invoiceSchema } = require("../../validations/SalesAndFinance/invoiceValidation");

const router = express.Router();

router
  .route("/")
  .get(getAllInvoices)
  .post(validate(invoiceSchema), createInvoice);

router
  .route("/:id")
  .get(getInvoiceById)
  .put(validate(invoiceSchema), updateInvoice)
  .delete(deleteInvoice);

module.exports = router;
