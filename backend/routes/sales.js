const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

// Routes for sales management
router.post("/", salesController.createSales);
router.get("/", salesController.getAllSales);
router.get("/:id", salesController.getSalesById);
router.put("/:id", salesController.updateSales);
router.delete("/:id", salesController.deleteSales);

module.exports = router;
