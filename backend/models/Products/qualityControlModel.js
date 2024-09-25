const mongoose = require("mongoose");

const qualityControlSchema = mongoose.Schema(
  {
    productType: {
      type: String,
      required: true,
    },
    inspectionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String, 
      enum: ['Passed', 'Failed'],
      default: 'Pass',
      required: true 
    },
    inspectorName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QualityControl', qualityControlSchema);


