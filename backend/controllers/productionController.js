const ProductionSchedule = require('../models/productionModel.js');

// Controller for creating a new production schedule
exports.createProductionSchedule = async (req, res) => {
    try {
        const { scheduleId, productType, quantity, startDate, endDate, status, progress } = req.body;

        if (!scheduleId || !productType || !quantity || !startDate || !endDate) {
            return res.status(400).send({
                message: 'Please provide all required fields: scheduleId, productType, quantity, startDate, endDate',
            });
        }

        const newSchedule = {
            scheduleId,
            productType,
            quantity,
            startDate,
            endDate,
            status,
            progress,
        };

        const productionSchedule = await ProductionSchedule.create(newSchedule);
        return res.status(201).send(productionSchedule);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all production schedules
exports.getAllProductionSchedules = async (req, res) => {
    try {
        const schedules = await ProductionSchedule.find({});
        return res.status(200).json({
            count: schedules.length,
            data: schedules,
        });
    } catch (error) {
        console.log('Error fetching schedules:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single production schedule by ID
exports.getProductionScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await ProductionSchedule.findById(id);

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).json(schedule);
    } catch (error) {
        console.log('Error fetching schedule:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a production schedule
exports.updateProductionSchedule = async (req, res) => {
    try {
        const { productType, quantity, startDate, endDate, status, progress } = req.body;

        if (!productType || !quantity || !startDate || !endDate || !status || progress === undefined) {
            return res.status(400).send({
                message: 'Send all required fields: productType, quantity, startDate, endDate, status, progress',
            });
        }

        const { id } = req.params;

        const result = await ProductionSchedule.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Production schedule not found' });
        }

        return res.status(200).send({ message: 'Production schedule updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a production schedule
exports.deleteProductionSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await ProductionSchedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        return res.status(200).send({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
