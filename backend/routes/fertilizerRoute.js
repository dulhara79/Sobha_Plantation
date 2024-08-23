const express = require("express");
const router = express.Router();

//Insert Model

const Fertilizer = require("../models/fertilizerModel");

//Insert Fertilizer Controller
const fertilizerController = require("../controllers/fertilizerController");

router.get("/",fertilizerController.getAllFertilizers);
router.post("/",fertilizerController.addFertilizers);
router.get("/:id",fertilizerController.getById);
router.put("/:id",fertilizerController.updateFertilizer);
router.delete("/:id",fertilizerController.deleteFertilizer);


//export
module.exports = router;