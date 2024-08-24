const mongoose = require("mongoose");

const productionScheduleSchema = mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: true,
      unique: true,
    },
    productType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    progress: {
      type: Number,
      default: 0, // Percentage of progress (0-100)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductionSchedule', productionScheduleSchema);
