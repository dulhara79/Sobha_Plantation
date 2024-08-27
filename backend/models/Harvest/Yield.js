const mongoose = require("mongoose");

// Define a schema for harvest records
const harvestrecordsSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required."],
      unique: true,
      trim: true,
    },
    harvestdate: {
      type: Date,
      required: [true, "Harvest date is required."],
      validate: {
        validator: function (value) {
          // Current date
          const today = new Date();
          // Check if the date is in the future
          if (value > today) {
            return false;
          }
          // Check if the date is within the last 10 years
          const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
          if (value < tenYearsAgo) {
            return false;
          }
          return true;
        },
        message: "Harvest date must be in the past and within the last 10 years.",
      },
    },
    cropType: {
      type: String,
      required: [true, "Crop type is required."],
      enum: {
        values: ["Papaya", "Banana", "Coconut", "Pepper"],
        message: "{VALUE} is not a valid crop type.",
      },
    },
    ageofYieldDate: {
      type: Number,
      required: [true, "Age of yield date is required."],
      min: [0, "Age of yield date must be at least 0."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [0, "Quantity must be at least 0."],
    },
    wayPicked: {
      type: String,
      required: [true, "Way of picking is required."],
      enum: {
        values: ["manual", "mechanisms"],
        message: "{VALUE} is not a valid way of picking.",
      },
    },
    treesPicked: {
      type: Number,
      required: [true, "Number of trees picked is required."],
      min: [0, "Trees picked must be at least 0."],
    },
    storageLocation: {
      type: String,
      required: [true, "Storage location is required."],
      trim: true,
      minlength: [3, "Storage location must be at least 3 characters long."],
      maxlength: [100, "Storage location must be at most 100 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("harvestrecords", harvestrecordsSchema);