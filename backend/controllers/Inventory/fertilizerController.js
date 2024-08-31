const mongoose = require('mongoose');
const FertilizerRecords = require('../../models/Inventory/fertilizers'); // Ensure this path is correct


exports.createFertilizerRecords = async (req, res) => {
    try {
        const { addeddate, fertilizertype, quantity, storagelocation, expireddate } = req.body;

        // Validate required fields
        if (!addeddate || !fertilizertype || !quantity || !storagelocation || !expireddate ) {
            return res.status(400).json({
                message: 'Please provide all required fields: addeddate, fertilizertype, quantity, storagelocation, expireddate',
            });
        }

        // Create a new yield record
        const newRecord = new FertilizerRecords({
            addeddate,
            fertilizertype,
            quantity,
            storagelocation,
            expireddate

            // Ensure id field is either auto-generated or removed if not required
        });

        // Save the record to the database
        const savedRecord = await newRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating  fertilizer record:', error);
        res.status(500).json({ message: 'Failed to create  fertilizer record.', error: error.message });
    }
};


// Controller for getting all Yield Records
exports.getAllFertilizerRecords = async (req, res) => {
    try {
        const records = await FertilizerRecords.find({});
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
exports.getFertilizerRecordsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const record = await FertilizerRecords.findById(id);

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
exports.updateFertilizerRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const { addeddate, fertilizertype, quantity, storagelocation, expireddate } = req.body;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        // Ensure all required fields are present
        if (!addeddate || !fertilizertype || !quantity || !storagelocation || !expireddate ) {
            return res.status(400).json({
                message: 'Please provide all required fields: addeddate, fertilizertype, quantity, storagelocation, expireddate ',
            });
        }

        // Update the record
        const result = await FertilizerRecords.findByIdAndUpdate(
            id,
            { addeddate, fertilizertype, quantity, storagelocation, expireddate },
            { new: true, runValidators: true }
        );

        // Handle case where record is not found
        if (!result) {
            return res.status(404).json({ message: 'Fertilizer Record not found' });
        }

        // Successfully updated the record
        return res.status(200).json({ message: 'Fertilizer Record updated successfully', data: result });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Failed to update record.', error: error.message });
    }
};

// Controller for deleting a Yield Record by Id
exports.deleteFertilizerRecords = async (req, res) => {
    try {
      const { id } = req.params; // Ensure this is correctly obtained
      const deletedRecord = await FertilizerRecords.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error deleting record:', error.message);
      res.status(500).json({ message: 'Failed to delete record.' });
    }
  };