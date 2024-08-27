const Maintenance = require("../../models/Inventory/maintenanceModel");

// Controller for creating a new Maintenance record
exports.createMaintenance = async (req, res) => {
    try {
        const { machineName, quantity, referredDate, datereceived, location, status } = req.body;

        if (!machineName || !quantity || !referredDate || !datereceived || !location || !status) {
            return res.status(400).send({
                message: 'Please provide all required fields: machineName, quantity, referredDate, datereceived, location, status',
            });
        }

        const newMaintenance = {
            machineName,
            quantity,
            referredDate,
            datereceived,
            location,
            status,
        };

        const maintenance = await Maintenance.create(newMaintenance);
        return res.status(201).send(maintenance);
    } catch (error) {
        console.log('Error creating maintenance record:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all Maintenance records
exports.getAllMaintenance = async (req, res) => {
    try {
        const maintenanceRecords = await Maintenance.find({});
        return res.status(200).json({
            count: maintenanceRecords.length,
            data: maintenanceRecords,
        });
    } catch (error) {
        console.log('Error fetching maintenance records:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single Maintenance record by ID
exports.getMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for maintenance record with ID:', id);

        const maintenance = await Maintenance.findById(id).exec();

        if (!maintenance) {
            console.log('No maintenance record found with ID:', id);
            return res.status(404).json({ message: 'Maintenance record not found' });
        }

        return res.status(200).json(maintenance);
    } catch (error) {
        console.log('Error fetching maintenance record:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a Maintenance record by ID
exports.updateMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const { machineName, quantity, referredDate, datereceived, location, status } = req.body;

        console.log('Updating maintenance record with ID:', id);
        console.log('Update data:', req.body);

        if (!machineName || !quantity || !referredDate || !datereceived || !location || !status) {
            return res.status(400).send({
                message: 'Please provide all required fields: machineName, quantity, referredDate, datereceived, location, status',
            });
        }

        const updatedMaintenance = await Maintenance.findOneAndUpdate(
            { id: id },
            { machineName, quantity, referredDate, datereceived, location, status },
            { new: true, runValidators: true } // Return updated document and run schema validations
        ).exec();

        if (!updatedMaintenance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }

        return res.status(200).send({ message: 'Maintenance record updated successfully', data: updatedMaintenance });
    } catch (error) {
        console.log('Error updating maintenance record:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a Maintenance record by ID
exports.deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMaintenance = await Maintenance.findOneAndDelete({ id: id });

        if (!deletedMaintenance) {
            return res.status(404).json({ message: 'Maintenance record not found' });
        }

        return res.status(200).send({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        console.log('Error deleting maintenance record:', error.message);
        res.status(500).send({ message: error.message });
    }
};
