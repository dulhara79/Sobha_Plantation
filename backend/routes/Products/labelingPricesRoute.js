// labelingPricesRoute.js

const express = require('express');
const router = express.Router();
const labelingPricesController = require('../../controllers/Products/labelingPricesController');

// Route to create a new labeling price
router.post('/', labelingPricesController.createLabelingPrice);

// Route to get all labeling prices
router.get('/', labelingPricesController.getAllLabelingPrices);

// Route to get a specific labeling price by ID
router.get('/:id', labelingPricesController.getLabelingPriceById);

// Route to update a labeling price
router.put('/:id', labelingPricesController.updateLabelingPrice);

// Route to delete a labeling price
router.delete('/:id', labelingPricesController.deleteLabelingPrice);

module.exports = router;
