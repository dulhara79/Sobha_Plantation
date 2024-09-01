const express = require('express');
const {
    createMaintenanceRecords,
    getAllMaintenanceRecords,
    getMaintenanceRecordsById,
    updateMaintenanceRecords,
    deleteMaintenanceRecords,
} = require('../../controllers/Inventory/maintenanceController'); // Adjusted path

const router = express.Router();

// Route to create a new Fertilizer
router.post('/', createMaintenanceRecords);

// Route to get all Fertilizers
router.get('/', getAllMaintenanceRecords);

// Route to get a single Fertilizer by ID
router.get('/:id', getMaintenanceRecordsById);

// Route to update a Fertilizer by ID
router.put('/:id', updateMaintenanceRecords);

// Route to delete a Fertilizer by ID
router.delete('/:id', deleteMaintenanceRecords);

module.exports = router;
