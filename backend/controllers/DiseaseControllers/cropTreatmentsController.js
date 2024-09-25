const mongoose = require("mongoose");
const cropTreatmentRecords = require("../../models/DiseaseModels/cropTreatmentsModel");

exports.createTreatments = async (req, res) => {
    try {
        const { dateOfTreatment, pestOrDisease, treatmentMethod, healthRate, treatedBy, notes } = req.body;

        //validate request
        if (!dateOfTreatment || !pestOrDisease || !treatmentMethod || !healthRate || !treatedBy || !notes) {
            return res.status(400).json({ message: "All fields are required" });
        }


// Create a new treatment record
const newRecord = new cropTreatmentRecords({
    dateOfTreatment,
    pestOrDisease,
    treatmentMethod,
    healthRate,
    treatedBy,
    notes
});

// Save the treatment record
const saveTreatmentRecord = await newRecord.save();
return res.status(201).json(saveTreatmentRecord);
} catch (error) {
    console.error('Error creating treatment record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
}
};

// Get all treatment records
exports.getAllTreatments = async (req, res) => {
    try {
        const allTreatmentRecords = await cropTreatmentRecords.find();
        return res.status(200).json({ count: allTreatmentRecords.length, data: allTreatmentRecords });
    } catch (error) {
        console.error('Error fetching treatment records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific treatment by ID
exports.getTreatmentsById = async (req, res) => {
    try {
        const { treatmentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
            return res.status(400).json({ message: "Invalid treatment ID" });
        }

        const treatmentRecord = await cropTreatmentRecords.findById(treatmentId);

        if (!treatmentRecord) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        return res.status(200).json({ treatmentRecord });
    } catch (error) {
        console.error('Error fetching treatment by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Update a treatment record
exports.updateTreatments = async (req, res) => {
        try {
            const { treatmentId } = req.params;
            const { dateOfTreatment, pestOrDisease, treatmentMethod, healthRate, treatedBy, notes } = req.body;

            if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
                return res.status(400).json({ message: "Invalid treatment ID" });
            }

            if (!dateOfTreatment || !pestOrDisease || !treatmentMethod || !healthRate || !treatedBy || !notes) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Update the treatment record
            const updatedTreatmentRecord = await cropTreatmentRecords.findByIdAndUpdate(treatmentId,
                { dateOfTreatment, pestOrDisease, treatmentMethod, healthRate, treatedBy, notes },
                { new: true, runValidators: true });

        if (!updatedTreatmentRecord) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        return res.status(200).json({ message: "Treatment record updated successfully", data: updatedTreatmentRecord });
    } catch (error) {
        console.error('Error updating treatment record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a treatment record
exports.deleteTreatments = async (req, res) => {
    try {
        const { treatmentId } = req.params;

        const deletedTreatmentRecord = await cropTreatmentRecords.findByIdAndDelete(treatmentId);
        if (!deletedTreatmentRecord) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        return res.status(200).json({ message: "Treatment record deleted successfully" });
    } catch (error) {
        console.error('Error deleting treatment record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
