<<<<<<< Updated upstream:backend/controllers/harvestScheduleController.js
<<<<<<< Updated upstream:backend/controllers/harvestScheduleController.js
const HarvestSchedule = require('../models/Harvest.js');
=======
const HarvestSchedule = require('../../models/Harvest/Harvest');
>>>>>>> Stashed changes:backend/controllers/Harvest/harvestScheduleController.js
=======
const HarvestSchedule = require('../../models/Harvest/Harvest');
>>>>>>> Stashed changes:backend/controllers/Harvest/harvestScheduleController.js

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
        console.log(error.message);
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

// Controller for getting a single Harvest schedule by harvestId (custom ID)
exports.getHarvestScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use harvestId instead of _id
        const schedule = await HarvestSchedule.findOne({ harvestId: id });

        if (!schedule) {
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
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !estimatedYield || !harvestMethod || !numberOfworkers) {
            return res.status(400).send({
                message: 'Send all required fields: harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield, harvestMethod, numberOfworkers',
            });
        }

        const { id } = req.params;
        
        // Update by harvestId instead of _id
        const result = await HarvestSchedule.findOneAndUpdate({ harvestId: id }, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Harvest schedule not found' });
        }

        return res.status(200).send({ message: 'Harvest schedule updated successfully', data: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a Harvest schedule by harvestId
exports.deleteHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete by harvestId instead of _id
        const deletedSchedule = await HarvestSchedule.findOneAndDelete({ harvestId: id });

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
