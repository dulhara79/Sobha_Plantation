const express = require("express");
const router = express.Router();

//Insert Model
<<<<<<< Updated upstream
const Fertilizer = require("../Model/FertilizerModel");

//Insert Fertilizer Controller
const FertilizerController = require("../Controllers/FertilizerControllers");

router.get("/",FertilizerController.getAllFertilizers);
router.post("/",FertilizerController.addFertilizers);
router.get("/:id",FertilizerController.getById);
router.put("/:id",FertilizerController.updateFertilizer);
router.delete("/:id",FertilizerController.deleteFertilizer);
=======
const Fertilizer = require("../Model/fertilizerModel");

//Insert Fertilizer Controller
const fertilizerController = require("../Controllers/fertilizerControllers");

router.get("/",fertilizerController.getAllFertilizers);
router.post("/",fertilizerController.addFertilizers);
router.get("/:id",fertilizerController.getById);
router.put("/:id",fertilizerController.updateFertilizer);
router.delete("/:id",fertilizerController.deleteFertilizer);
>>>>>>> Stashed changes

//export
module.exports = router;