const express = require('express');
const {
  createSoilTest,
  getAllSoilTests,
  getSoilTestById,
  updateSoilTest,
  deleteSoilTest
} = require('../controllers/soilTestingController');

const router = express.Router();

router.post('/', createSoilTest);
router.get('/', getAllSoilTests);
router.get('/:id', getSoilTestById);
router.put('/:id', updateSoilTest);
router.delete('/:id', deleteSoilTest);

module.exports = router;
