const Attendance = require('../../models/Employee/AttendanceModel');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const { date } = req.query; // Get date from query parameters
        let attendance;

        if (date) {
            // Fetch attendance records for the specified date
            attendance = await Attendance.find({ date: new Date(date) });
        } else {
            // Fetch all attendance records if no date is provided
            attendance = await Attendance.find();
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error });
    }
};
// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance record', error });
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
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Error updating attendance record', error });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(id);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance record', error });
    }
};

// Get attendance records by employee name
exports.getAttendanceByEmployeeName = async (req, res) => {
    const { name } = req.params;
    console.log("backend name: ", name);
    try {
        const attendance = await Attendance.find({ name });
        if (attendance.length === 0) {
            return res.status(404).json({ message: 'Attendance records not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error });
    }
};