const express = require("express");
const {
  createSalesTracking,
  getAllSalesTracking,
  getSalesTrackingById,
  updateSalesTracking,
  deleteSalesTracking,
  getWeeklySalesSummary,
  getMonthlySalesSummary,
  getYearlyRevenueSummary,
} = require("../../controllers/SalesAndFinance/SalesTrackingController");
const {
  validate,
} = require("../../middleware/SalesAndFinance/validateMiddleware");
const {
  salesTrackingSchema,
} = require("../../validations/SalesAndFinance/salesTrackingValidation");

const router = express.Router();

router.post("/", createSalesTracking);
router.get("/", getAllSalesTracking);
router.get("/getRecord/:id", getSalesTrackingById);
router.put("/:id", updateSalesTracking);
router.delete("/:id", deleteSalesTracking);
router.get("/weekly-summary", getWeeklySalesSummary);
router.get("/monthly-summary", getMonthlySalesSummary);
router.get("/yearly-revenue-summary", getYearlyRevenueSummary); // New route

module.exports = router;
