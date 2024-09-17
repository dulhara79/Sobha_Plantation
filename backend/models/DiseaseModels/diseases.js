
const mongoose = require("mongoose");

const DiseasesSchema = new mongoose.Schema({
    recordId: {
        type: String,
        required: true, //validate
        unique: true,
    },
    inspectionDate: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
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
    inspector: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("diseases", DiseasesSchema);
