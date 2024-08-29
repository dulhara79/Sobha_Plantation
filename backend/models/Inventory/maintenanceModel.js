
const mongoose = require("mongoose");

const maintenanceSchema = mongoose.Schema(
  {
    machineName: {
      type: String,
      required: [true, "Machine/Equipment name is required"],
      trim: true,
      minlength: [3, "Machine/Equipment name must be at least 3 characters long"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [100000, "Quantity cannot exceed 100,000"],
    },
    referredDate: {
      type: Date,
      required: [true, "Referred date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date(); // Referred date must be today or in the past
        },
        message: "Referred date cannot be in the future",
      },
    },
    datereceived: {
      type: Date,
      required: [true, "Received date is required"],
      validate: {
        validator: function (value) {
          return value > this.referredDate; // Received date must be after referred date
        },
        message: "Received date must be after the referred date",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [3, "Location must be at least 3 characters long"],
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
