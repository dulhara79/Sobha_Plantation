const express = require("express");
const router = express.Router();
const {
  getAllBuyerInfoRecords,
  createBuyerInfoRecords,
  getBuyerInfoRecordsById,
  updateBuyerInfoRecords,
  deleteBuyerInfoRecords,
} = require("../controllers/buyerInfoController"); 

// Routes for Info Management
router.get("/", getAllBuyerInfoRecords);
router.post("/", createBuyerInfoRecords);
router.get("/:InfoId", getBuyerInfoRecordsById);
router.put("/:InfoId", updateBuyerInfoRecords);
router.delete("/:InfoId", deleteBuyerInfoRecords);

module.exports = router;
