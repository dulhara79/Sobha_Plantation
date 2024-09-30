const mongoose = require("mongoose");
const BuyerInfoRecords = require("../models/buyerInfo");

exports.createBuyerInfoRecords = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      Gender,
      DOB,
      Number,
      email,
    } = req.body;

    // Validate request
    if (!firstName || !lastName || !Gender || !DOB || !Number || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Info record
    const newRecord = new BuyerInfoRecords({
      firstName,
      lastName,
      Gender,
      DOB,
      Number,
      email,
    });

    // Save the Info record
    const saveBuyerInfoRecord = await newRecord.save();
    return res.status(201).json(saveBuyerInfoRecord);
  } catch (error) {
    console.error('Error creating Info record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};
// Get all Info records
exports.getAllBuyerInfoRecords = async (req, res) => {
    try {
        const allBuyerInfoRecords = await BuyerInfoRecords.find();
        return res.status(200).json({ count: allBuyerInfoRecords.length, data: allBuyerInfoRecords });
    } catch (error) {
        console.error('Error fetching Info records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific Info by ID
exports.getBuyerInfoRecordsById = async (req, res) => {
    try {
        const { InfoId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(InfoId)) {
            return res.status(400).json({ message: "Invalid Info ID" });
        }

        const BuyerInfoRecord = await BuyerInfoRecords.findById(InfoId);

        if (!BuyerInfoRecord) {
            return res.status(404).json({ message: "Info info not found" });
        }
        return res.status(200).json({ BuyerInfoRecord });
    } catch (error) {
        console.error('Error fetching Info by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
// Update a Info record
exports.updateBuyerInfoRecords = async (req, res) => {
    try {
        const { InfoId } = req.params;
        const { firstName, lastName, Gender, DOB, Number, email } = req.body;

        if (!mongoose.Types.ObjectId.isValid(InfoId)) {
            return res.status(400).json({ message: "Invalid Info ID" });
        }

        if (!firstName || !lastName || !Gender || !DOB || !Number || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update the Info record
        const updatedBuyerInfoRecord = await BuyerInfoRecords.findByIdAndUpdate(
            InfoId,
            { firstName, lastName,  Gender, DOB: new Date(DOB), Number, email },
            { new: true }
        );

        if (!updatedBuyerInfoRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        return res.status(200).json(updatedBuyerInfoRecord);
    } catch (error) {
        console.error('Error updating Info record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a Info record
exports.deleteBuyerInfoRecords = async (req, res) => {
  try {
      const { InfoId } = req.params;

      const deletedBuyerInfoRecord = await BuyerInfoRecords.findByIdAndDelete(InfoId);
      if (!deletedBuyerInfoRecord) {
          return res.status(404).json({ message: "Info not found" });
      }
      return res.status(200).json({ message: "Info record deleted successfully" });
  } catch (error) {
      console.error('Error deleting Info record:', error.message || error);
      res.status(500).json({ message: "Server error", error: error.message || error });
  }
}; 