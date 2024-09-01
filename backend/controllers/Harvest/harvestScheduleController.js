const HarvestSchedule = require('../../models/Harvest/Harvest');

// Controller for creating a new Harvest schedule
exports.createHarvestSchedule = async (req, res) => {
    try {
        const { harvestId, cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers } = req.body;

        if (!harvestId || !cropType || !harvestDate || !startTime || !endTime || !fieldNumber ||  !numberOfWorkers) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: harvestId, cropType, harvestDate, startTime, endTime, numberOfWorkers',
            });
        }

        const newSchedule = {
            harvestId,
            cropType,
            harvestDate,
            startTime,
            endTime,
            fieldNumber,
            numberOfWorkers,
        };

        const harvestSchedule = await HarvestSchedule.create(newSchedule);
        return res.status(201).json({ success: true, data: harvestSchedule });
    } catch (error) {
        console.log('Error creating harvest schedule:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller for getting all Harvest schedules
exports.getAllHarvestSchedule = async (req, res) => {
    try {
        const schedules = await HarvestSchedule.find({});
        return res.status(200).json({
            success: true,
            count: schedules.length,
            data: schedules,
        });
    } catch (error) {
        console.log('Error fetching schedules:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller for getting a single Harvest schedule by harvestId
exports.getHarvestScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const schedule = await HarvestSchedule.findOne({ harvestId: id });

        if (!schedule) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }

        return res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        console.log('Error fetching schedule:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller for updating a Harvest schedule by harvestId
exports.updateHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { cropType, harvestDate, startTime, endTime, fieldNumber,numberOfWorkers } = req.body;

        if (!cropType || !harvestDate || !startTime || !endTime || !fieldNumber ||!numberOfWorkers) {
            return res.status(400).json({
                success: false,
                message: 'Send all required fields: cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers',
            });
        }

        const result = await HarvestSchedule.findOneAndUpdate(
            { harvestId: id },
            { cropType, harvestDate, startTime, endTime, fieldNumber, numberOfWorkers },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ success: false, message: 'Harvest schedule not found' });
        }

        return res.status(200).json({ success: true, message: 'Harvest schedule updated successfully', data: result });
    } catch (error) {
        console.log('Error updating schedule:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller for deleting a Harvest schedule by harvestId
exports.deleteHarvestSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await HarvestSchedule.findOneAndDelete({ harvestId: id });

        if (!deletedSchedule) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }

        return res.status(200).json({ success: true, message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log('Error deleting schedule:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
