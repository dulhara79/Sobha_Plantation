const express = require('express');
const router = express.Router();
const { createEmployeeSalary, getAllEmployeeSalaries, getEmployeeSalaryById, updateEmployeeSalary, deleteEmployeeSalary } = require('../controllers/salaryEmployeeController');

// Create a new employee salary
router.post('/', createEmployeeSalary);

// Get all employee salaries
router.get('/', getAllEmployeeSalaries);

// Get employee salary by ID
router.get('/:id', getEmployeeSalaryById);

// Update employee salary
router.put('/:id', updateEmployeeSalary);

// Delete employee salary
router.delete('/:id', deleteEmployeeSalary);

module.exports = router;
