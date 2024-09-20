const express = require("express");
const router = express.Router();
const {
    getAllTreatments,
    createTreatments,
    getTreatmentsById,
    updateTreatments,
    deleteTreatments,
    } = require("../../controllers/DiseaseControllers/cropTreatmentsController");

// Routes for Treatments Management
router.get("/", getAllTreatments);
router.post("/", createTreatments);
router.get("/:treatmentId", getTreatmentsById);
router.put("/:treatmentId", updateTreatments);
router.delete("/:treatmentId", deleteTreatments);

module.exports = router;
