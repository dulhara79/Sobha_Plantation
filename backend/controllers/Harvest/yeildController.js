const mongoose = require('mongoose');
const YieldRecords = require('../../models/Harvest/Yield'); // Ensure this path is correct

// Controller for creating a new Yield Record
exports.createYieldRecords = async (req, res) => {
    try {
        const { harvestdate, fieldNumber, cropType, quantity,unit, treesPicked, storageLocation } = req.body;

        // Validate required fields
        if (!harvestdate || !fieldNumber || !cropType || !quantity || !unit || !treesPicked || !storageLocation) {
            return res.status(400).json({
                message: 'Please provide all required fields: harvestdate, fieldNumber, cropType, quantity,unit, treesPicked, storageLocation',
            });
        }

        // Create a new yield record
        const newRecord = new YieldRecords({
            harvestdate,
            fieldNumber,
            cropType,
            quantity,
            unit,
            treesPicked,
            storageLocation,
        });

        // Save the record to the database
        const savedRecord = await newRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating yield record:', error);
        res.status(500).json({ message: 'Failed to create yield record.', error: error.message });
    }
};

// Controller for getting all Yield Records
exports.getAllYieldRecords = async (req, res) => {
    try {
        const records = await YieldRecords.find({});
        return res.status(200).json({
            count: records.length,
            data: records,
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Failed to fetch records.', error: error.message });
    }
};

// Controller for getting a single Yield Record by Id
exports.getYieldRecordsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const record = await YieldRecords.findById(id);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record by id:', error);
        res.status(500).json({ message: 'Failed to fetch record.', error: error.message });
    }
};

// Controller for updating a Yield Record by Id
exports.updateYieldRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const { harvestdate, fieldNumber, cropType, quantity,unit, treesPicked, storageLocation } = req.body;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        // Ensure all required fields are present
        if (!harvestdate || !fieldNumber || !cropType || !quantity || !unit || !treesPicked || !storageLocation) {
            return res.status(400).json({
                message: 'Please provide all required fields: harvestdate, fieldNumber, cropType, quantity, treesPicked, storageLocation',
            });
        }

        // Update the record
        const result = await YieldRecords.findByIdAndUpdate(
            id,
            { harvestdate, fieldNumber, cropType, quantity,unit, treesPicked, storageLocation },
            { new: true, runValidators: true }
        );

        // Handle case where record is not found
        if (!result) {
            return res.status(404).json({ message: 'Yield Record not found' });
        }

        // Successfully updated the record
        return res.status(200).json({ message: 'Yield Record updated successfully', data: result });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Failed to update record.', error: error.message });
    }
};

// Controller for deleting a Yield Record by Id
exports.deleteYieldRecords = async (req, res) => {
    try {
        const { id } = req.params; // Ensure this is correctly obtained
        const deletedRecord = await YieldRecords.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting record:', error.message);
        res.status(500).json({ message: 'Failed to delete record.' });
    }
};


