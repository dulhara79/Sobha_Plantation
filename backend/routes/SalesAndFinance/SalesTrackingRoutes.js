const express = require("express");
const {
  createSalesTracking,
  getAllSalesTracking,
  getSalesTrackingById,
  updateSalesTracking,
  deleteSalesTracking,
} = require("../../controllers/SalesAndFinance/salesTrackingController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { salesTrackingSchema } = require("../../validations/SalesAndFinance/salesTrackingValidation");

const router = express.Router();

router
  .route("/")
  .get(getAllSalesTracking)
  .post(validate(salesTrackingSchema), createSalesTracking);

router
  .route("/:id")
  .get(getSalesTrackingById)
  .put(validate(salesTrackingSchema), updateSalesTracking)
  .delete(deleteSalesTracking);

module.exports = router;
