const express = require('express');
const {
    createComplianceCheck,
    getAllComplianceChecks,
    getComplianceCheckById,
    updateComplianceCheck,
    deleteComplianceCheck,
} = require('../../controllers/Harvest/complianceController'); // Ensure this path is correct

const router = express.Router();

// Route to create a new compliance check
router.post('/', createComplianceCheck);

// Route to get all compliance checks
router.get('/', getAllComplianceChecks);

// Route to get a single compliance check by Id
router.get('/:id', getComplianceCheckById);

// Route to update a compliance check by Id
router.put('/:id', updateComplianceCheck);

// Route to delete a compliance check by Id
router.delete('/:id', deleteComplianceCheck);

module.exports = router;
