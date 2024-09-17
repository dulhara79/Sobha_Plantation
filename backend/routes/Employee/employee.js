const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/Employee/employeeController');

// CRUD Routes
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
