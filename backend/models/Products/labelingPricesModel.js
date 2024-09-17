// labelingPricesModel.js

const mongoose = require('mongoose');

// Define the schema for labeling prices
const labelingPriceSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    unique: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  typeUnit: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('LabelingPrice', labelingPriceSchema);
