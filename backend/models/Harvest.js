const mongoose = require("mongoose");

const harvestScheduleSchema = mongoose.Schema(   
  {
    harvestId: {
      type: String,
      required: true,
      unique: true,
    },
    cropType: {
      type: String,
      required: true,
    },
    harvestDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Time,
      required: true,
    },
    endTime: {
      type: Time,
      required: true,
    },
    fieldNumber: {
        type: String,
        required: true,
        unique: true,
    },
    estimatedYield: {
        type: Number,
        required: true,
    },
    harvestMethod: {
        type: String,
        required: true,
    },
    numberOfworkers: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('harvestSchedule', harvestScheduleSchema);