const mongoose = require("mongoose");

const qualitySchema = mongoose.Schema(
  {
    cropType: {
      type: String,
      required: true,
    },
    checkDate: {
      type: Date,
      required: true,
    },
    qualityStatus: {
      type: String, 
      enum: ['Passed', 'Failed'],
      default: 'Pass',
      required: true 
    },
    qualityController: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HarvestQuality', qualitySchema);


