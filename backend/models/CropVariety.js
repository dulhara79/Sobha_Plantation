const mongoose = require("mongoose");

const CropVarietySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    assignedPerson: {
        type: String,
        required: true,
    },
    fieldName: {
        type: String,
        required: true,
    },
    varieties: {
        type: String,
        required: true,
    },
    plantationDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "Completed"],
        default: "Planned",
    },
});

module.exports = mongoose.model("CropVariety", CropVarietySchema);
