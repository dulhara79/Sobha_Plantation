const mongoose = require("mongoose");

const regularMaintenanceSchema = new mongoose.Schema({
    dateOfMaintenance: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  managerInCharge: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  maintenanceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
    sparse: true,
  },
});

module.exports = mongoose.model("regularMaintenanceRecords", regularMaintenanceSchema);
