const mongoose = require("mongoose");
const DiseaseRecords = require("../../models/DiseaseModels/diseases");

exports.createDiseases = async (req, res) => {
    try {
        const { dateOfInspection, sectionOfLand, identifiedPest, identifiedDisease, inspectedBy, inspectionResult, suggestedReInspectionDate } = req.body;

        //validate request
        if (!dateOfInspection || !sectionOfLand || !identifiedPest || !identifiedDisease || !inspectedBy || !inspectionResult || !suggestedReInspectionDate) {
            return res.status(400).json({ message: "All fields are required" });
        }


// Create a new disease record
const newRecord = new DiseaseRecords({
    dateOfInspection,
    sectionOfLand,
    identifiedPest,
    identifiedDisease,
    inspectedBy,
    inspectionResult,
    suggestedReInspectionDate
});

// Save the disease record
const saveDiseaseRecord = await newRecord.save();
return res.status(201).json(saveDiseaseRecord);
} catch (error) {
    console.error('Error creating disease record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
}
};

// Get all disease records
exports.getAllDiseases = async (req, res) => {
    try {
        const allDiseaseRecords = await DiseaseRecords.find();
        return res.status(200).json({ count: allDiseaseRecords.length, data: allDiseaseRecords });
    } catch (error) {
        console.error('Error fetching disease records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific disease by ID
exports.getDiseasesById = async (req, res) => {
    try {
        const { diseaseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(diseaseId)) {
            return res.status(400).json({ message: "Invalid disease ID" });
        }

        const diseaseRecord = await DiseaseRecords.findById(diseaseId);

        if (!diseaseRecord) {
            return res.status(404).json({ message: "Disease not found" });
        }
        return res.status(200).json({ diseaseRecord });
    } catch (error) {
        console.error('Error fetching disease by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Update a disease record
exports.updateDiseases = async (req, res) => {
        try {
            const { diseaseId } = req.params;
            const { dateOfInspection, sectionOfLand, identifiedPest, identifiedDisease, inspectedBy, inspectionResult, suggestedReInspectionDate } = req.body;

            if (!mongoose.Types.ObjectId.isValid(diseaseId)) {
                return res.status(400).json({ message: "Invalid disease ID" });
            }

            if (!dateOfInspection || !sectionOfLand || !identifiedPest || !identifiedDisease || !inspectedBy || !inspectionResult || !suggestedReInspectionDate) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Update the disease record
            const updatedDiseaseRecord = await DiseaseRecords.findByIdAndUpdate(diseaseId, 
                { dateOfInspection, sectionOfLand, identifiedPest, identifiedDisease, inspectedBy, inspectionResult, suggestedReInspectionDate },
                { new: true, runValidators: true });

        if (!updatedDiseaseRecord) {
            return res.status(404).json({ message: "Disease not found" });
        }
        return res.status(200).json({ message: "Disease record updated successfully", data: updatedDiseaseRecord });
    } catch (error) {
        console.error('Error updating disease record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a disease record
exports.deleteDiseases = async (req, res) => {
    try {
        const { diseaseId } = req.params;

        const deletedDiseaseRecord = await DiseaseRecords.findByIdAndDelete(diseaseId);
        if (!deletedDiseaseRecord) {
            return res.status(404).json({ message: "Disease not found" });
        }
        return res.status(200).json({ message: "Disease record deleted successfully" });
    } catch (error) {
        console.error('Error deleting disease record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
