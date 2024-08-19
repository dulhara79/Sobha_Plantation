const express = require('express');
const {
    createHarvestSchedule,
    getAllHarvestSchedule,
    getHarvestScheduleById,
    updateHarvestSchedule,
    deleteHarvestSchedule,
} = require('../controllers/harvestScheduleController.js');

const router = express.Router();

router.post('/', createHarvestSchedule);
router.get('/', getAllHarvestSchedule);
router.get('/:id', getHarvestScheduleById);
router.put('/:id', updateHarvestSchedule);
router.delete('/:id', deleteHarvestSchedule);

module.exports = router;