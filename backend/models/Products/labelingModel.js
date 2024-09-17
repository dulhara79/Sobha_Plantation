// models/labelingModel.js
const mongoose = require('mongoose');

const labelingSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  labelingDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Labeling = mongoose.model('Labeling', labelingSchema);

module.exports = Labeling;
