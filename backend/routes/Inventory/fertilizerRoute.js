const express = require("express");
const {
    createFertilizers,
    getAllFertilizers,
    getFertilizersById,
    updateFertilizers,
    deleteFertilizers,
} = require('../../controllers/Inventory/fertilizerController'); // Adjusted path


const router = express.Router();

router.post('/', createFertilizers);
router.get('/', getAllFertilizers);
router.get('/:id', getFertilizersById);
router.put('/:id', updateFertilizers);
router.delete('/:id', deleteFertilizers);

module.exports = router;


