const Schedule = require("../models/Schedule");

// Create a new schedule
const createSchedule = async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all schedules
const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific schedule by ID
const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a schedule by ID
const updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!schedule) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        res.json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a schedule by ID
const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        res.json({ message: "Schedule deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};
