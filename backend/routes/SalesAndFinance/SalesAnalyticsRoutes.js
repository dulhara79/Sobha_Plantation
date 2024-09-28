const express = require("express");
const {
  createSalesAnalytics,
  getAllSalesAnalytics,
  getSalesAnalyticsById,
  updateSalesAnalytics,
  deleteSalesAnalytics,
  getWeeklySalesSummary
} = require("../../controllers/SalesAndFinance/salesAnalyticsController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { salesAnalyticsSchema } = require("../../validations/SalesAndFinance/salesAnalyticsValidation");

const router = express.Router();

router.post("/", createSalesAnalytics);
router.get("/", getAllSalesAnalytics);
router.get("/:id", getSalesAnalyticsById);
router.put("/:id", updateSalesAnalytics);
router.delete("/:id", deleteSalesAnalytics);


// router
//   .route("/")
//   .get(getAllSalesAnalytics)
//   .post(validate(salesAnalyticsSchema), createSalesAnalytics);

// router
//   .route("/:id")
//   .get(getSalesAnalyticsById)
//   .put(validate(salesAnalyticsSchema), updateSalesAnalytics)
//   .delete(deleteSalesAnalytics);

module.exports = router;
