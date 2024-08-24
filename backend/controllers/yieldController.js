const YieldRecords = require('../models/Yield')

// Controller for creating a new Harvest schedule
exports.createYieldRecords = async (req, res) => {
    try {
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !estimatedYield || !harvestMethod || !numberOfworkers) {
            return res.status(400).send({
                message: 'Please provide all required fields: harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers',
            });
        }

        const newRecords = {
            harvestId,
            cropType,
            harvestDate,
            startTime,
            endTime,
            fieldNumber,
            estimatedYield,
            harvestMethod,
            numberOfworkers
        };

        const yieldRecords = await YieldRecords.create(newRecords);
        return res.status(201).send(yieldRecords);
    } catch (error) {
        console.log('Error creating harvest schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all Harvest schedules
exports.getAllYieldRecords = async (req, res) => {
    try {
        const records = await YieldRecords.find({});
        return res.status(200).json({
            count: records.length,
            data: records,
        });
    } catch (error) {
        console.log('Error fetching schedules:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single Harvest schedule by harvestId
exports.getYieldRecordsById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for schedule with harvestId:', id);
        
        const records = await YieldRecords.findOne({ harvestId: id }).exec();

        if (!records) {
            console.log('No schedule found with harvestId:', id);
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.log('Error fetching schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a Harvest schedule by harvestId
exports.updateYieldRecords = async (req, res) => {
    try {
        // Extract harvestId from URL parameters and data from request body
        const { id } = req.params;
        const { cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers } = req.body;

        // Log the incoming parameters and data
        console.log('Updating schedule with harvestId:', id);
        console.log('Update data:', req.body);

        // Check if required fields are present
        if (!cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !estimatedYield || !harvestMethod || !numberOfworkers) {
            return res.status(400).send({
                message: 'Send all required fields: cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers',
            });
        }

        // Perform the update operation
        const result = await YieldRecords.findOneAndUpdate(
            { harvestId: id },
            { cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers },
            { new: true }
        ).exec();

        // Check if the schedule was found and updated
        if (!result) {
            return res.status(404).json({ message: 'Harvest schedule not found' });
        }

        // Send the updated schedule
        return res.status(200).send({ message: 'Harvest schedule updated successfully', data: result });
    } catch (error) {
        // Log any errors and send a response
        console.log('Error updating schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};


// Controller for deleting a Harvest schedule by harvestId
exports.deleteYieldRecords = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecords = await YieldRecords.findOneAndDelete({ harvestId: id });

        if (!deletedRecords) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log('Error deleting schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};
