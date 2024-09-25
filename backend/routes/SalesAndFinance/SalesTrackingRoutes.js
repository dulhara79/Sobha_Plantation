const express = require("express");
const {
  createSalesTracking,
  getAllSalesTracking,
  getSalesTrackingById,
  updateSalesTracking,
  deleteSalesTracking,
  getWeeklySalesSummary
} = require("../../controllers/SalesAndFinance/SalesTrackingController");
const { validate } = require("../../middleware/SalesAndFinance/validateMiddleware");
const { salesTrackingSchema } = require("../../validations/SalesAndFinance/salesTrackingValidation");

const router = express.Router();

router.post("/", createSalesTracking);
router.get("/", getAllSalesTracking);
// router.get("/:id", getSalesTrackingById);
router.put("/:id", updateSalesTracking);
router.delete("/:id", deleteSalesTracking);
router.get('/weekly-summary', getWeeklySalesSummary);

// router
//   .route("/")
//   .get(getAllSalesTracking)
//   .post(validate(salesTrackingSchema), createSalesTracking);

// router
//   .route("/:id")
//   .get(getSalesTrackingById)
//   .put(validate(salesTrackingSchema), updateSalesTracking)
//   .delete(deleteSalesTracking);

module.exports = router;
