const express = require("express");
const {
  createSalesAnalytics,
  getAllSalesAnalytics,
  getSalesAnalyticsById,
  updateSalesAnalytics,
  deleteSalesAnalytics,
} = require("../../controllers/SalesAndFinance/salesAnalyticsController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { salesAnalyticsSchema } = require("../../validations/SalesAndFinance/salesAnalyticsValidation");

const router = express.Router();

router
  .route("/")
  .get(getAllSalesAnalytics)
  .post(validate(salesAnalyticsSchema), createSalesAnalytics);

router
  .route("/:id")
  .get(getSalesAnalyticsById)
  .put(validate(salesAnalyticsSchema), updateSalesAnalytics)
  .delete(deleteSalesAnalytics);

module.exports = router;
