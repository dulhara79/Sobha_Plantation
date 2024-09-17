const express = require('express');
const {
    createFertilizerRecords,
    getAllFertilizerRecords,
    getFertilizerRecordsById,
    updateFertilizerRecords,
    deleteFertilizerRecords,
} = require('../../controllers/Inventory/fertilizerController'); // Adjusted path

const router = express.Router();

// Route to create a new Fertilizer
router.post('/', createFertilizerRecords);

// Route to get all Fertilizers
router.get('/', getAllFertilizerRecords);

// Route to get a single Fertilizer by ID
router.get('/:id', getFertilizerRecordsById);

// Route to update a Fertilizer by ID
router.put('/:id', updateFertilizerRecords);

// Route to delete a Fertilizer by ID
router.delete('/:id', deleteFertilizerRecords);

module.exports = router;
