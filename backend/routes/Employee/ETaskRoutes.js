// ETaskRoutes.js
const express = require('express');
const router = express.Router();
const ETaskController = require('../../controllers/Employee/ETaskController');

// Define routes
router.post('/', ETaskController.createTask);
router.get('/', ETaskController.getAllTasks);
router.get('/:id', ETaskController.getTaskById);
router.put('/:id', ETaskController.updateTask);
router.delete('/:id', ETaskController.deleteTask);

module.exports = router;
