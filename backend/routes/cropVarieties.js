const express = require("express");
const router = express.Router();
const cropVarietyController = require("../controllers/cropVarietyController");

// Routes for crop variety management
router.post("/", cropVarietyController.createCropVariety);
router.get("/", cropVarietyController.getAllCropVarieties);
router.get("/:id", cropVarietyController.getCropVarietyById);
router.put("/:id", cropVarietyController.updateCropVariety);
router.delete("/:id", cropVarietyController.deleteCropVariety);

module.exports = router;
