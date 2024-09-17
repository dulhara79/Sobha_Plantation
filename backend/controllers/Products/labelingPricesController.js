// labelingPricesController.js

const LabelingPrice = require('../../models/Products/labelingPricesModel');

// Create a new labeling price entry
exports.createLabelingPrice = async (req, res) => {
  try {
    const { productType, unitPrice, typeUnit } = req.body;

    // Check if the productType already exists
    const existingProduct = await LabelingPrice.findOne({ productType });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product type already exists.' });
    }

    const newLabelingPrice = new LabelingPrice({ productType, unitPrice, typeUnit });
    await newLabelingPrice.save();

    res.status(201).json(newLabelingPrice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all labeling prices
exports.getAllLabelingPrices = async (req, res) => {
  try {
    const labelingPrices = await LabelingPrice.find({});
    return res.status(200).json({
      count: labelingPrices.length,
      data: labelingPrices,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching labeling prices:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


// Get a specific labeling price by ID
exports.getLabelingPriceById = async (req, res) => {
  try {
    const labelingPrice = await LabelingPrice.findById(req.params.id);
    if (!labelingPrice) {
      return res.status(404).json({ message: 'Labeling price not found' });
    }
    res.status(200).json(labelingPrice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a labeling price
exports.updateLabelingPrice = async (req, res) => {
  try {
    const { productType, unitPrice, typeUnit } = req.body;
    const labelingPrice = await LabelingPrice.findById(req.params.id);

    if (!labelingPrice) {
      return res.status(404).json({ message: 'Labeling price not found' });
    }

    labelingPrice.productType = productType;
    labelingPrice.unitPrice = unitPrice;
    labelingPrice.typeUnit = typeUnit;
    await labelingPrice.save();

    res.status(200).json(labelingPrice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a labeling price
exports.deleteLabelingPrice = async (req, res) => {
  try {
    const labelingPrice = await LabelingPrice.findById(req.params.id);

    if (!labelingPrice) {
      return res.status(404).json({ message: 'Labeling price not found' });
    }

    await labelingPrice.remove();
    res.status(200).json({ message: 'Labeling price deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
