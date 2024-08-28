const express = require('express');
const {
  createPlantGrowth,
  getAllPlantGrowthRecords,
  getPlantGrowthById,
  updatePlantGrowth,
  deletePlantGrowth
} = require('../controllers/plantGrowthController');

const router = express.Router();

router.post('/', createPlantGrowth);
router.get('/', getAllPlantGrowthRecords);
router.get('/:id', getPlantGrowthById);
router.put('/:id', updatePlantGrowth);
router.delete('/:id', deletePlantGrowth);

module.exports = router;
