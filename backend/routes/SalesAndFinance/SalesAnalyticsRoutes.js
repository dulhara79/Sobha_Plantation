const express = require("express");
const {
  createSalesAnalytics,
  getAllSalesAnalytics,
  getSalesAnalyticsById,
  updateSalesAnalytics,
  deleteSalesAnalytics,
  getWeeklySalesSummary,
  getMonthlySalesSummary
} = require("../../controllers/SalesAndFinance/salesAnalyticsController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { salesAnalyticsSchema } = require("../../validations/SalesAndFinance/salesAnalyticsValidation");

const router = express.Router();

router.post("/", createSalesAnalytics);
router.get("/", getAllSalesAnalytics);
router.get("/:id", getSalesAnalyticsById);
router.put("/:id", updateSalesAnalytics);
router.delete("/:id", deleteSalesAnalytics);
// router.get("/weekly", getWeeklySalesSummary);
router.get("/monthly-summary", getMonthlySalesSummary);

module.exports = router;
