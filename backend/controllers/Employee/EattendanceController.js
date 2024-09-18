const Attendance = require('../../models/Employee/AttendanceModel');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error });
    }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    const { name, date, status, actions } = req.body;
    try {
        const newAttendance = new Attendance({ name, date, status, actions });
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Error creating attendance record', error });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { name, date, status, actions } = req.body;
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, { name, date, status, actions }, { new: true });
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Error updating attendance record', error });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        await Attendance.findByIdAndDelete(id);
        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance record', error });
    }
};
