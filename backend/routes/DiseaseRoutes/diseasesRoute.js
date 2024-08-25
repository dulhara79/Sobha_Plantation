const express = require("express");
const router = express.Router();

const Disease = require("../../models/DiseaseModels/diseases");
const diseasesController = require("../../controllers/DiseaseControllers/diseasesController");

// Routes for Diseases Management

router.get("/", diseasesController.getAllDiseases);
router.post("/", diseasesController.createDiseases);
router.get("/:id", diseasesController.getDiseasesById);
router.put("/:id", diseasesController.updateDiseases);
router.delete("/:id", diseasesController.deleteDiseases);

module.exports = router;