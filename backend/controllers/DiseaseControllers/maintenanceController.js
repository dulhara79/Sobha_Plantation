const mongoose = require("mongoose");
const maintenanceRecords = require("../../models/DiseaseModels/maintenanceModel");

exports.createMaintenance = async (req, res) => {
    try {
        const { dateOfMaintenance, task, managerInCharge, progress } = req.body;

        //validate request
        if (!dateOfMaintenance || !task || !managerInCharge || !progress) {
            return res.status(400).json({ message: "All fields are required" });
        }


// Create a new maintenance record
const newRecord = new maintenanceRecords({
    dateOfMaintenance,
    task,
    managerInCharge,
    progress
});

// Save the maintenance record
const saveMaintenanceRecord = await newRecord.save();
return res.status(201).json(saveMaintenanceRecord);
} catch (error) {
    console.error('Error creating maintenance record:', error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
}
};

// Get all maintenance records
exports.getAllMaintenanceRecords = async (req, res) => {
    try {
        const allMaintenanceRecords = await maintenanceRecords.find();
        return res.status(200).json({ count: allMaintenanceRecords.length, data: allMaintenanceRecords });
    } catch (error) {
        console.error('Error fetching maintenance records:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Get a specific maintenance by ID
exports.getMaintenanceById = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(maintenanceId)) {
            return res.status(400).json({ message: "Invalid maintenance ID" });
        }

        const maintenanceRecord = await maintenanceRecords.findById(maintenanceId);

        if (!maintenanceRecord) {
            return res.status(404).json({ message: "Maintenance not found" });
        }
        return res.status(200).json({ maintenanceRecord });
    } catch (error) {
        console.error('Error fetching maintenance by ID:', error.message || error);
        return res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Update a maintenance record
exports.updateMaintenance = async (req, res) => {
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
            const updatedMaintenanceRecord = await maintenanceRecords.findByIdAndUpdate(maintenanceId,
                { dateOfMaintenance, task, managerInCharge, progress },
                { new: true, runValidators: true });

        if (!updatedMaintenanceRecord) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        return res.status(200).json({ message: "Maintenance record updated successfully", data: updatedMaintenanceRecord });
    } catch (error) {
        console.error('Error updating maintenance record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// Delete a maintenance record
exports.deleteMaintenance = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        const deletedMaintenanceRecord = await maintenanceRecords.findByIdAndDelete(maintenanceId);
        if (!deletedMaintenanceRecord) {
            return res.status(404).json({ message: "Maintenance not found" });
        }
        return res.status(200).json({ message: "Maintenance record deleted successfully" });
    } catch (error) {
        console.error('Error deleting maintenance record:', error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
