const mongoose = require('mongoose');

const SoilTestSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true,
  },
  soilPH: {
    type: Number,
    required: true,
    min: 0,
    max: 14,
  },
  nutrientLevels: {
    type: String,
    required: true,
  },
  organicMatterContent: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('SoilTest', SoilTestSchema);
