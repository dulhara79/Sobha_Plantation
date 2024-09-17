const mongoose = require("mongoose");

const harvestScheduleSchema = mongoose.Schema({
    cropType: {
        type: String,
        required: [true, 'Crop type is required'],
    },
    harvestDate: {
        type: Date,
        required: [true, 'Harvest date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
    },
    fieldNumber: {
        type: String,
        required: [true, 'Field number is required'],
    },
    
    numberOfWorkers: {
        type: Number,
        required: [true, 'Number of workers is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('HarvestSchedule', harvestScheduleSchema);
