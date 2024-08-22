const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");

// Routes for crop variety management
router.post("/", buyerController.createBuyer);
router.get("/", buyerController.getAllBuyer);
router.get("/:id", buyerController.getBuyerById);
router.put("/:id", buyerController.updateBuyer);
router.delete("/:id", buyerController.deleteBuyer);

module.exports = router;
