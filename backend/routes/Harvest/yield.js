const express = require('express');
const {
    createYieldRecords,
    getAllYieldRecords,
    getYieldRecordsById,
    updateYieldRecords,
    deleteYieldRecords,
} = require('../../controllers/Harvest/yeildController');

const router = express.Router();

router.post('/', createYieldRecords);
router.get('/', getAllYieldRecords);
router.get('/:id', getYieldRecordsById);
router.put('/:id', updateYieldRecords);
router.delete('/:id', deleteYieldRecords);

module.exports = router;