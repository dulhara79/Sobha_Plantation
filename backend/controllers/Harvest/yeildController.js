const mongoose = require('mongoose');
const YieldRecords = require('../../models/Harvest/Yield'); // Ensure this path is correct

// Controller for creating a new Yield Record
exports.createYieldRecords = async (req, res) => {
    try {
        const { id, harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation } = req.body;

        if (!id || !harvestdate || !cropType || !ageofYieldDate || !quantity || !wayPicked || !treesPicked || !storageLocation) {
            return res.status(400).json({
                message: 'Please provide all required fields: id, harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation',
            });
        }

        const newRecord = {
            id,
            harvestdate,
            cropType,
            ageofYieldDate,
            quantity,
            wayPicked,
            treesPicked,
            storageLocation
        };

        const yieldRecords = await YieldRecords.create(newRecord);
        return res.status(201).json(yieldRecords);
    } catch (error) {
        console.error('Error creating yield record:', error);  // Enhanced error logging
        res.status(500).json({ message: 'Failed to create yield record.' });
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
        console.error('Error fetching records:', error);  // Enhanced error logging
        res.status(500).json({ message: 'Failed to fetch records.' });
    }
};

// Controller for getting a single Yield Record by Id
exports.getYieldRecordsById = async (req, res) => {
    try {
        const { id } = req.params;

        const records = await YieldRecords.findOne({ id: id }).exec();

        if (!records) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching record by id:', error);  // Enhanced error logging
        res.status(500).json({ message: 'Failed to fetch record.' });
    }
};

// Controller for updating a Yield Record by Id
exports.updateYieldRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const { harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation } = req.body;

        // Ensure all required fields are present
        if (!harvestdate || !cropType || !ageofYieldDate || !quantity || !wayPicked || !treesPicked || !storageLocation) {
            return res.status(400).json({
                message: 'Please provide all required fields: harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation',
            });
        }

        // Update the record
        const result = await YieldRecords.findOneAndUpdate(
            { id: id },
            { harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation },
            { new: true, runValidators: true }
        ).exec();

        // Handle case where record is not found
        if (!result) {
            return res.status(404).json({ message: 'Yield Record not found' });
        }

        // Successfully updated the record
        return res.status(200).json({ message: 'Yield Record updated successfully', data: result });
    } catch (error) {
        console.error('Error updating record:', error);  // Enhanced error logging
        res.status(500).json({ message: 'Failed to update record.' });
    }
};



// Controller for deleting a Yield Record by Id
exports.deleteYieldRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await YieldRecords.findOneAndDelete({ id });

        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Error deleting record:', error.message);
        res.status(500).json({ message: 'Failed to delete record.' });
    }
};

