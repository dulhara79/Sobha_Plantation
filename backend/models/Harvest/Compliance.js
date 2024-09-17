const mongoose = require('mongoose');

const complianceCheckSchema = new mongoose.Schema({
  criteriaName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  // Optional custom 'id' field
  // id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: () => new mongoose.Types.ObjectId(), // Generates a new ObjectId if 'id' is needed
  //   unique: true, // Ensure unique index if needed
  //   sparse: true,  // Allows null values if unique index is still desired
  // }
});

module.exports = mongoose.model('ComplianceCheck', complianceCheckSchema);
