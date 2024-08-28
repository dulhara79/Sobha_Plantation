const mongoose = require("mongoose");

const harvestScheduleSchema = mongoose.Schema({
    harvestId: {
        type: String,
        required: [true, 'Harvest ID is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Harvest ID must be at least 3 characters long'],
    },
    cropType: {
        type: String,
        required: [true, 'Crop type is required'],
        enum: ['Coconut', 'Banana', 'Pepper', 'Papaya'],
    },
    harvestDate: {
        type: Date,
        required: [true, 'Harvest date is required'],
        validate: {
            validator: function(value) {
                return value >= new Date().setHours(0, 0, 0, 0); // Compare dates without time
            },
            message: 'Harvest date cannot be in the past',
        },
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format'],
        validate: {
            validator: function(value) {
                return value > this.startTime;
            },
            message: 'End time must be after start time',
        },
    },
    fieldNumber: {
        type: String,
        required: [true, 'Field number is required'],
        match: [/^\d+$/, 'Field number must be numeric'],
    },
    harvestMethod: {
        type: String,
        required: [true, 'Harvest method is required'],
        enum: ['Manual', 'Mechanical'],
    },
    estimatedYield: {
        type: Number,
        required: [true, 'Estimated yield is required'],
    },
    numberOfWorkers: {
        type: Number,
        required: [true, 'Number of workers is required'],
        minlength: [2, 'Harvest ID must be at least 3 characters long'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('HarvestSchedule', harvestScheduleSchema);
