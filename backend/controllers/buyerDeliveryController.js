const mongoose = require("mongoose");
const BuyerDeliveryRecords = require("../models/buyerDelivery"); 
// 2 ..

exports.createBuyerDeliveryRecords = async (req, res) => {
    try {
        const { firstName, lastName, email, address, city, country, postalCode, phone} = req.body;

        //validate request
        if (!firstName || !lastName || !email || !address || !city || !country || !postalCode || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }


// Create a new delivery record
const newRecord = new BuyerDeliveryRecords({
    firstName, lastName, email, address, city, country, postalCode, phone
});

// Save the delivery record
const saveBuyerDeliveryRecord = await newRecord.save();
return res.status(201).json(saveBuyerDeliveryRecord);
} catch (error) {
    console.error('Error creating delivery record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
}
};

// Get all delivery records
exports.getAllBuyerDeliveryRecords = async (req, res) => {
    try {
        const allBuyerDeliveryRecords = await BuyerDeliveryRecords.find();
        return res.status(200).json({ count: allBuyerDeliveryRecords.length, data: allBuyerDeliveryRecords });
    } catch (error) {
        console.error('Error fetching delivery records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific delivery by ID
exports.getBuyerDeliveryRecordsById = async (req, res) => {
    try {
        const { deliveryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
            return res.status(400).json({ message: "Invalid delivery ID" });
        }

        const BuyerDeliveryRecord = await BuyerDeliveryRecords.findById(deliveryId);

        if (!BuyerDeliveryRecord) {
            return res.status(404).json({ message: "delivery info not found" });
        }
        return res.status(200).json({ BuyerDeliveryRecord });
    } catch (error) {
        console.error('Error fetching delivery by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Update a delivery record
exports.updateBuyerDeliveryRecords = async (req, res) => {
        try {
            const { deliveryId } = req.params;
            const { firstName, lastName, email, address, city, country, postalCode, phone } = req.body;

            if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
                return res.status(400).json({ message: "Invalid delivery ID" });
            }

            if (!firstName || !lastName || !email || !address || !city || !country || !postalCode || !phone) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Update the delivery record
            const updatedBuyerDeliveryRecord = await BuyerDeliveryRecords.findByIdAndUpdate(deliveryId, 
                { firstName, lastName, email, address, city, country, postalCode, phone },
                { new: true, runValidators: true });

        if (!updatedBuyerDeliveryRecord) {
            return res.status(404).json({ message: "delivery not found" });
        }
        return res.status(200).json({ message: "delivery record updated successfully", data: updatedBuyerDeliveryRecord });
    } catch (error) {
        console.error('Error updating delivery record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a delivery record
exports.deleteBuyerDeliveryRecords = async (req, res) => {
    try {
        const { deliveryId } = req.params;

        const deletedBuyerDeliveryRecord = await BuyerDeliveryRecords.findByIdAndDelete(deliveryId);
        if (!deletedBuyerDeliveryRecord) {
            return res.status(404).json({ message: "delivery not found" });
        }
        return res.status(200).json({ message: "delivery record deleted successfully" });
    } catch (error) {
        console.error('Error deleting delivery record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
}; //adarei babiiiiiiiiiiiiiiii