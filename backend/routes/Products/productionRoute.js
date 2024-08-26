const express = require('express');
const {
    createProductionSchedule,
    getAllProductionSchedules,
    getProductionScheduleById,
    updateProductionSchedule,
    deleteProductionSchedule,
} = require('../../controllers/Products/productionController');

const router = express.Router();

router.post('/', createProductionSchedule);
router.get('/', getAllProductionSchedules);
router.get('/:id', getProductionScheduleById);
router.put('/:id', updateProductionSchedule);
router.delete('/:id', deleteProductionSchedule);

module.exports = router;
