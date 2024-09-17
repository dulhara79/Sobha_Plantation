const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
    actions: { type: String, default: '' }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
