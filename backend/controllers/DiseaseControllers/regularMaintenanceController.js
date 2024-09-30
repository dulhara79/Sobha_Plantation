const mongoose = require("mongoose");
const regularMaintenanceRecords = require("../../models/DiseaseModels/regularMaintenanceModel");

exports.createRegularMaintenance = async (req, res) => {
    try {
        const { dateOfMaintenance, task, managerInCharge, progress } = req.body;

        //validate request
        if (!dateOfMaintenance || !task || !managerInCharge || !progress) {
            return res.status(400).json({ message: "All fields are required" });
        }


// Create a new maintenance record
const newRecord = new regularMaintenanceRecords({
    dateOfMaintenance,
    task,
    managerInCharge,
    progress
});

// Save the maintenance record
const saveRegularMaintenanceRecord = await newRecord.save();
return res.status(201).json(saveRegularMaintenanceRecord);
} catch (error) {
    console.error('Error creating maintenance record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
}
};

// Get all maintenance records
exports.getAllRegularMaintenanceRecords = async (req, res) => {
    try {
        const allRegularMaintenanceRecords = await regularMaintenanceRecords.find();
        return res.status(200).json({ count: allRegularMaintenanceRecords.length, data: allRegularMaintenanceRecords });
    } catch (error) {
        console.error('Error fetching maintenance records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific maintenance by ID
exports.getRegularMaintenanceById = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(maintenanceId)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }

        const regularMaintenanceRecord = await regularMaintenanceRecords.findById(maintenanceId);

        if (!regularMaintenanceRecord) {
            return res.status(404).json({ message: "Maintenance not found" });
        }
        return res.status(200).json({ regularMaintenanceRecord });
    } catch (error) {
        console.error('Error fetching maintenance by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Update a maintenance record
exports.updateRegularMaintenance = async (req, res) => {
        try {
            const { maintenanceId } = req.params;
            const { dateOfMaintenance, task, managerInCharge, progress } = req.body;

            if (!mongoose.Types.ObjectId.isValid(maintenanceId)) {
                return res.status(400).json({ message: "Invalid maintenance ID" });
            }

            if (!dateOfMaintenance || !task || !managerInCharge || !progress) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Update the maintenance record
            const updatedRegularMaintenanceRecord = await regularMaintenanceRecords.findByIdAndUpdate(maintenanceId,
                { dateOfMaintenance, task, managerInCharge, progress },
                { new: true, runValidators: true });

        if (!updatedRegularMaintenanceRecord) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        return res.status(200).json({ message: "Maintenance record updated successfully", data: updatedRegularMaintenanceRecord });
    } catch (error) {
        console.error('Error updating maintenance record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a maintenance record
exports.deleteRegularMaintenance = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        const deletedRegularMaintenanceRecord = await regularMaintenanceRecords.findByIdAndDelete(maintenanceId);
        if (!deletedRegularMaintenanceRecord) {
            return res.status(404).json({ message: "Maintenance not found" });
        }
        return res.status(200).json({ message: "Maintenance record deleted successfully" });
    } catch (error) {
        console.error('Error deleting maintenance record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
