const express = require("express");
const router = express.Router();

//Insert Model
const Fertilizer = require("../Model/FertilizerModel");

//Insert Fertilizer Controller
const FertilizerController = require("../Controllers/FertilizerControllers");

router.get("/",FertilizerController.getAllFertilizers);
router.post("/",FertilizerController.addFertilizers);
router.get("/:id",FertilizerController.getById);
router.put("/:id",FertilizerController.updateFertilizer);
router.delete("/:id",FertilizerController.deleteFertilizer);

//export
module.exports = router;