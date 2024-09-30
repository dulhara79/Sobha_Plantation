const express = require('express');
const {
    createPackaging,
    getAllPackaging,
    getPackagingById,
    updatePackaging,
    deletePackaging,
} = require('../../controllers/Products/packagingController');

const router = express.Router();

router.post('/', createPackaging);
router.get('/', getAllPackaging);
router.get('/:id', getPackagingById);
router.put('/:id', updatePackaging);
router.delete('/:id', deletePackaging);

module.exports = router;
