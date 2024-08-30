const mongoose = require("mongoose");

// Define a schema for harvest records
const harvestrecordsSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
    },
    harvestdate: {
      type: Date,
    },
    cropType: {
      type: String,
    },
    ageofYieldDate: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    wayPicked: {
      type: String,
    },
    treesPicked: {
      type: Number,
    },
    storageLocation: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("harvestrecords", harvestrecordsSchema);
