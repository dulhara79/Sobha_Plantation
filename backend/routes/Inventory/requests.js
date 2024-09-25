const express = require('express');
const {
    createRequestPaymentRecords,
    getAllRequestPaymentRecords,
    getRequestPaymentRecordsById,
    updateRequestPaymentRecords,
    deleteRequestPaymentRecords,
} = require('../../controllers/Inventory/requestPaymentController'); // Adjusted path

const router = express.Router();

// Route to create a new Fertilizer
router.post('/', createRequestPaymentRecords);

// Route to get all Fertilizers
router.get('/', getAllRequestPaymentRecords);

// Route to get a single Fertilizer by ID
router.get('/:id', getRequestPaymentRecordsById);

// Route to update a Fertilizer by ID
router.put('/:id', updateRequestPaymentRecords);

// Route to delete a Fertilizer by ID
router.delete('/:id', deleteRequestPaymentRecords);

module.exports = router;
