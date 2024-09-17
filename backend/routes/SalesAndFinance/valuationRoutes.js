const express = require("express");
const {
    createValuationRecord,
    getAllValuationRecords,
    getValuationRecordById,
    updateValuationRecord,
    deleteValuationRecord
} = require ("../../controllers/SalesAndFinance/ValuationController");

const router = express.Router();

// Route to create a new valuation record
router.post('/', createValuationRecord);

// Route to get all valuation records
router.get('/', getAllValuationRecords);

// Route to get a valuation record by ID
router.get('/:id', getValuationRecordById);

// Route to update a valuation record
router.put('/:id', updateValuationRecord);

// Route to delete a valuation record
router.delete('/:id', deleteValuationRecord);

module.exports = router;
