const express = require('express');
const {
    createEquipmentRecords,
    getAllEquipmentRecords,
    getEquipmentRecordsById,
    updateEquipmentRecords,
    deleteEquipmentRecords,
} = require('../../controllers/Inventory/equipmentController'); // Adjusted path

const router = express.Router();

// Route to create a new Fertilizer
router.post('/', createEquipmentRecords);

// Route to get all Fertilizers
router.get('/', getAllEquipmentRecords,
);

// Route to get a single Fertilizer by ID
router.get('/:id', getEquipmentRecordsById,
);

// Route to update a Fertilizer by ID
router.put('/:id', updateEquipmentRecords);

// Route to delete a Fertilizer by ID
router.delete('/:id', deleteEquipmentRecords);

module.exports = router;
