const HarvestSchedule = require('../models/Harvest.js');

// Controller for creating a new  Harvest schedule
exports.createHarvestSchedule= async (req, res) => {
    try {
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, estimatedYield,harvestMethod,numberOfworkers} = req.body;

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

// Controller for getting all  Harvest schedules
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

// Controller for getting a single  Harvest schedule by ID
exports.getHarvestScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await HarvestSchedule.findById(id);

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.log('Error fetching schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a  Harvest schedule
exports.updateHarvestSchedule = async (req, res) => {
    try {
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber,estimatedYield,harvestMethod,numberOfworkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || fieldNumber,estimatedYield,harvestMethod,numberOfworkers) {
            return res.status(400).send({
                message: 'Send all required fields: harvestId, cropType, harvestDate, startTime, endTime, fieldNumber,estimatedYield, harvestMethod, numberOfworkers',
            });
        }

        const { id } = req.params;

        const result = await HarvestSchedule.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Harvest schedule not found' });
        }

        return res.status(200).send({ message: 'Harvest schedule updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a  Harvest schedule
exports.deleteHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await HarvestSchedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
