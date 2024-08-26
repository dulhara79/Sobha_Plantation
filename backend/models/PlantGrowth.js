const mongoose = require('mongoose');

const PlantGrowthSchema = new mongoose.Schema({
  plantType: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  height: {
    type: Number,
    required: true,
  },
  numberOfLeaves: {
    type: Number,
    required: true,
  },
  leafSize: {
    type: String,
    required: true,
  },
  healthIssues: {
    type: String,
    default: "None",
  },
}, { timestamps: true });

module.exports = mongoose.model('PlantGrowth', PlantGrowthSchema);
