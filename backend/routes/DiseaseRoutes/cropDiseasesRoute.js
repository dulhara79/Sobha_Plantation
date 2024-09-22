const express = require("express");
const router = express.Router();
const {
    getAllDiseases,
    createDiseases,
    getDiseasesById,
    updateDiseases,
    deleteDiseases,
    } = require("../../controllers/DiseaseControllers/cropDiseasesController");

// Routes for Diseases Management
router.get("/", getAllDiseases);
router.post("/", createDiseases);
router.get("/:diseaseId", getDiseasesById);
router.put("/:diseaseId", updateDiseases);
router.delete("/:diseaseId", deleteDiseases);

module.exports = router;
