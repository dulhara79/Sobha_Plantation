const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    plantationDate: {
        type: Date,
        required: true,
    },
    assignedTeam: {
        type: String,
        required: true,
    },
    fieldName: {
        type: String,
        required: true,
    },
    cropVariety: {
        type: String,
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    seedsUsed: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "Completed"],
        default: "Planned",
    },
}, { timestamps: true });

module.exports = mongoose.model("Schedule", ScheduleSchema);
