const mongoose = require("mongoose");

const DiseasesSchema = new mongoose.Schema(
  {
    dateOfInspection: {
      type: Date,
      required: true,
    },
    sectionOfLand: {
      type: String,
      required: true,
    },
    identifiedPest: {
      type: String,
      required: true,
      default: "None",
    },
    identifiedDisease: {
      type: String,
      required: true,
      default: "None",
    },
    inspectedBy: {
      type: String,
      required: true,
    },
    inspectionResult: {
      type: String,
      required: true,
    },
    suggestedReInspectionDate: {
      type: Date,
      required: true,
    },
    diseaseId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
        sparse: true
        }
    });

module.exports = mongoose.model("DiseaseRecords", DiseasesSchema);
