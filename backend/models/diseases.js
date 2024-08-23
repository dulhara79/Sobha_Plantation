const mongoose = require("mongoose");

const DiseasesSchema = new mongoose.Schema({
    recordId: {
        type: String,
        required: true,
        unique: true,
    },
    pest: {
        type: String,
        required: true,
        default: "None",
    },
    disease: {
        type: String,
        required: true,
        default: "None",
    },
    inspectionDate: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D'],
        default: 'Complicated',
    },
    inspector: {
        type: String,
        required: true,
    },
    nextDate: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Diseases", DiseasesSchema);
