const mongoose = require("mongoose");
const BuyerPreOrderRecords = require("../models/buyerPreOrder");

exports.createBuyerPreOrderRecords = async (req, res) => {
  try {
    const { name, phoneNumber, address, productType, productQuantity, orderDate } = req.body;

    // Validate request
    if (!name || !phoneNumber || !address || !productType || !productQuantity || !orderDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new PreOrder record
    const newRecord = new BuyerPreOrderRecords({
      name,
      phoneNumber,
      address,
      productType,
      productQuantity,
      orderDate,
    });

    // Save the PreOrder record
    const saveBuyerPreOrderRecord = await newRecord.save();
    return res.status(201).json(saveBuyerPreOrderRecord);
  } catch (error) {
    console.error('Error creating PreOrder record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

// Get all PreOrder records
exports.getAllBuyerPreOrderRecords = async (req, res) => {
  try {
    const allBuyerPreOrderRecords = await BuyerPreOrderRecords.find();
    return res.status(200).json({ count: allBuyerPreOrderRecords.length, data: allBuyerPreOrderRecords });
  } catch (error) {
    console.error('Error fetching PreOrder records:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

// Get a specific PreOrder by ID
exports.getBuyerPreOrderRecordsById = async (req, res) => {
  try {
    const { PreOrderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(PreOrderId)) {
      return res.status(400).json({ message: "Invalid PreOrder ID" });
    }

    const BuyerPreOrderRecord = await BuyerPreOrderRecords.findById(PreOrderId);

    if (!BuyerPreOrderRecord) {
      return res.status(404).json({ message: "PreOrder not found" });
    }
    return res.status(200).json({ BuyerPreOrderRecord });
  } catch (error) {
    console.error('Error fetching PreOrder by ID:', error.message || error);
    return res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

// Update a PreOrder record
exports.updateBuyerPreOrderRecords = async (req, res) => {
  try {
    const { PreOrderId } = req.params;
    const { name, phoneNumber, address, productType, productQuantity, orderDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(PreOrderId)) {
      return res.status(400).json({ message: "Invalid PreOrder ID" });
    }

    if (!name || !phoneNumber || !address || !productType || !productQuantity || !orderDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update the PreOrder record
    const updatedBuyerPreOrderRecord = await BuyerPreOrderRecords.findByIdAndUpdate(
      PreOrderId,
      { name, phoneNumber, address, productType, productQuantity, orderDate },
      { new: true }
    );

    if (!updatedBuyerPreOrderRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(updatedBuyerPreOrderRecord);
  } catch (error) {
    console.error('Error updating PreOrder record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

// Delete a PreOrder record
exports.deleteBuyerPreOrderRecords = async (req, res) => {
  try {
    const { PreOrderId } = req.params;

    const deletedBuyerPreOrderRecord = await BuyerPreOrderRecords.findByIdAndDelete(PreOrderId);
    if (!deletedBuyerPreOrderRecord) {
      return res.status(404).json({ message: "PreOrder not found" });
    }
    return res.status(200).json({ message: "PreOrder record deleted successfully" });
  } catch (error) {
    console.error('Error deleting PreOrder record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};
