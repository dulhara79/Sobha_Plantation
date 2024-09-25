const express = require("express");
const { createBuyer, getAllBuyers, getBuyerById, updateBuyer, deleteBuyer } = require("../controllers/buyerController");

const router = express.Router();

// Create a new buyer
router.post("/buyers", createBuyer);

// Get all buyers
router.get("/buyers", getAllBuyers);

// Get a single buyer by ID
router.get("/buyers/:id", getBuyerById);

// Update a buyer by ID
router.put("/buyers/:id", updateBuyer);

// Delete a buyer by ID
router.delete("/buyers/:id", deleteBuyer);

// module.exports = router;
