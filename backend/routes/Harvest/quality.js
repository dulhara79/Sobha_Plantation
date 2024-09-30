const express = require('express');
const {
    createQualityControl,
    getAllQualityControl,
    getQualityControlById,
    updateQualityControl,
    deleteQualityControl,
} = require('../../controllers/Harvest/qualityController');

const router = express.Router();

router.post('/', createQualityControl);
router.get('/', getAllQualityControl);
router.get('/:id', getQualityControlById);
router.put('/:id', updateQualityControl);
router.delete('/:id', deleteQualityControl);

module.exports = router;
