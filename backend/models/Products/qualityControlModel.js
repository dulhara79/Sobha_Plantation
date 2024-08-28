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
      enum: ['Pass', 'Fail'],
      default: 'Pass',
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


