const mongoose = require("mongoose");

const TreatmentsSchema = new mongoose.Schema({
    dateOfTreatment: {
    type: Date,
    required: true,
  },
  pestOrDisease: {
    type: String,
    required: true,
  },
  treatmentMethod: {
    type: String,
    required: true,
  },
  healthRate: {
    type: String,
    required: true,
  },
  treatedBy: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  treatmentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
    sparse: true,
  },
});

module.exports = mongoose.model("TreatmentRecords", TreatmentsSchema);
