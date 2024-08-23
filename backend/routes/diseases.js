const express = require("express");
const router = express.Router();
const diseasesController = require("../controllers/diseasesController");

// Routes for Diseases Management (Adding a new disease, getting all diseases, getting a disease by ID, updating a disease, deleting a disease)
router.post("/", diseasesController.createDiseases);
router.get("/", diseasesController.getAllDiseases);
router.get("/:id", diseasesController.getDiseasesById);
router.put("/:id", diseasesController.updateDiseases);
router.delete("/:id", diseasesController.deleteDiseases);

module.exports = router;