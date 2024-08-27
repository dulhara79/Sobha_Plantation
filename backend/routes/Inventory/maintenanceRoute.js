const express = require("express");
const {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
} = require('../../controllers/Inventory/maintenanceController'); // Adjust the path as needed

const router = express.Router();

// Route to create a new maintenance record
router.post('/', createMaintenance);

// Route to get all maintenance records
router.get('/', getAllMaintenance);

// Route to get a maintenance record by ID
router.get('/:id', getMaintenanceById);

// Route to update a maintenance record by ID
router.put('/:id', updateMaintenance);

// Route to delete a maintenance record by ID
router.delete('/:id', deleteMaintenance);

module.exports = router;
