// routes/labelingRoute.js
const express = require('express');
const router = express.Router();
const labelingController = require('../../controllers/Products/labelingController');

// Routes for labeling management
router.post('/', labelingController.createLabeling);
router.get('/', labelingController.getAllLabelings);
router.get('/:id', labelingController.getLabelingById);
router.put('/:id', labelingController.updateLabeling);
router.delete('/:id', labelingController.deleteLabeling);

module.exports = router;
