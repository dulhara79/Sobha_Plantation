const HarvestSchedule = require('../../models/Harvest/Harvest');
const mongoose = require("mongoose");

// Controller for creating a new Harvest schedule
exports.createHarvestSchedule = async (req, res) => {
    try {

        const { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers } = req.body;

        if (!cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !numberOfWorkers) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers',
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || !fieldNumber ||  !numberOfWorkers) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: harvestId, cropType, harvestDate, startTime, endTime, numberOfWorkers',

            });
        }

        const newSchedule = new HarvestSchedule({
            cropType,
            harvestDate,
            startTime,
            endTime,
            fieldNumber,
            numberOfWorkers,
        });

        const savedSchedule = await newSchedule.save();
        return res.status(201).json(savedSchedule);
    } catch (error) {
        console.error('Error creating harvest schedule:', error);
        res.status(500).json({ message: 'Failed to create harvest schedule.', error: error.message });
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
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: 'Failed to fetch records.', error: error.message });
    }
};

// Controller for getting a single Harvest schedule by ID
exports.getHarvestScheduleById = async (req, res) => {
    try {
           const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        const schedule = await HarvestSchedule.findById(id);

        if (!schedule) {
            return res.status(404).json({message: 'Schedule not found' });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ message: 'Failed to fetch schedule.', error: error.message });
    }
};

// Controller for updating a Harvest schedule by ID
exports.updateHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        if (!cropType || !harvestDate || !startTime || !endTime || !fieldNumber || !numberOfWorkers) {

        const { cropType, harvestDate, startTime, endTime, fieldNumber,numberOfWorkers } = req.body;

        if (!cropType || !harvestDate || !startTime || !endTime || !fieldNumber ||!numberOfWorkers) {

            return res.status(400).json({
                success: false,
                message: 'Send all required fields: cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers',
            });
        }


        const result = await HarvestSchedule.findByIdAndUpdate(
            id,
            { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers },
            { new: true, runValidators: true }

        const result = await HarvestSchedule.findOneAndUpdate(
            { harvestId: id },
            { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers },
            { new: true }

        );

        if (!result) {
            return res.status(404).json({ message: 'Harvest schedule not found' });
        }

        return res.status(200).json({ message: 'Harvest schedule updated successfully', data: result });
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ message: 'Failed to update schedule.', error: error.message });
    }
};

// Controller for deleting a Harvest schedule by ID
exports.deleteHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await HarvestSchedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error.message);
        res.status(500).json({ message: 'Failed to delete schedule.' });
    }
};
