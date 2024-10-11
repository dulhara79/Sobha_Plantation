const express = require("express");
const router = express.Router();
const {
    getAllBuyerDeliveryRecords,
    createBuyerDeliveryRecords,
    getBuyerDeliveryRecordsById,
    updateBuyerDeliveryRecords,
    deleteBuyerDeliveryRecords,
    } = require("../controllers/buyerDeliveryController"); 

// Routes for delivery Management
router.get("/", getAllBuyerDeliveryRecords);
router.post("/", createBuyerDeliveryRecords);
router.get("/:deliveryId", getBuyerDeliveryRecordsById);
router.put("/:deliveryId", updateBuyerDeliveryRecords);
router.delete("/:deliveryId", deleteBuyerDeliveryRecords);

module.exports = router;