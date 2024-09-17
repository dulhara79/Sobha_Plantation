const express = require('express');
const router = express.Router();
const EattendanceController = require('../../controllers/Employee/EattendanceController');

// Route to get all attendance records
router.get('/', EattendanceController.getAllAttendance);

// Route to create a new attendance record
router.post('/', EattendanceController.createAttendance);

// Route to update an attendance record
router.put('/:id', EattendanceController.updateAttendance);

// Route to delete an attendance record
router.delete('/:id', EattendanceController.deleteAttendance);

module.exports = router;
