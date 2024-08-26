const express = require('express');
const {
    getAllFertilizers,
    addFertilizers,
    getById,
    updateFertilizer,
    deleteFertilizer
} = require('../controllers/fertilizerController');

const router = express.Router();

// Fertilizer routes
router.get('/', getAllFertilizers);
router.post('/', addFertilizers);
router.get('/:id', getById);
router.put('/:id', updateFertilizer);
router.delete('/:id', deleteFertilizer);

module.exports = router;
