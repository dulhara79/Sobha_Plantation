const HarvestSchedule = require('../../models/Harvest/Harvest');

// Controller for creating a new Harvest schedule
exports.createHarvestSchedule = async (req, res) => {
    try {
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !estimatedYield || !harvestMethod || !numberOfworkers) {
            return res.status(400).send({
                message: 'Please provide all required fields: harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers',
            });
        }

        const newSchedule = {
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

        const harvestSchedule = await HarvestSchedule.create(newSchedule);
        return res.status(201).send(harvestSchedule);
    } catch (error) {
        console.log('Error creating harvest schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all Harvest schedules
exports.getAllHarvestSchedule = async (req, res) => {
    try {
        const schedules = await HarvestSchedule.find({});
        return res.status(200).json({
            count: schedules.length,
            data: schedules,
        });
    } catch (error) {
        console.log('Error fetching schedules:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single Harvest schedule by harvestId
exports.getHarvestScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for schedule with harvestId:', id);
        
        const schedule = await HarvestSchedule.findOne({ harvestId: id }).exec();

        if (!schedule) {
            console.log('No schedule found with harvestId:', id);
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.log('Error fetching schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a Harvest schedule by harvestId
exports.updateHarvestSchedule = async (req, res) => {
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
        const result = await HarvestSchedule.findOneAndUpdate(
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
exports.deleteHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await HarvestSchedule.findOneAndDelete({ harvestId: id });

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log('Error deleting schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};
