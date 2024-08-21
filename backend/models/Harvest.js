const mongoose = require("mongoose");

const harvestScheduleSchema = mongoose.Schema({
    harvestId: {
        type: Number,
        required: [true, 'Harvest ID is required'],
        unique: true,
        trim: true, // Removes whitespace from both ends of the string
        minlength: [3, 'Harvest ID must be at least 3 characters long'], // Minimum length validation
    },
    cropType: {
        type: String,
        required: [true, 'Crop type is required'],
        enum: ['Coconut', 'Banana', 'Pepper', 'Papaya'], // Only allow specific crop types
    },
    harvestDate: {
        type: Date,
        required: [true, 'Harvest date is required'],
        validate: {
            validator: function(value) {
                return value >= new Date(); // Harvest date must be today or in the future
            },
            message: 'Harvest date cannot be in the past',
        },
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format'], // Regex for time validation
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format'],
        validate: {
            validator: function(value) {
                return value > this.startTime; // End time must be after start time
            },
            message: 'End time must be after start time',
        },
    },
    fieldNumber: {
        type: String,
        required: [true, 'Field number is required'],
        unique: true,
        match: [/^\d+$/, 'Field number must be numeric'], // Ensures field number is numeric
    },
    estimatedYield: {
        type: Number,
        required: [true, 'Estimated yield is required'],
        min: [1, 'Estimated yield must be at least 1'],
        max: [100000, 'Estimated yield cannot exceed 100,000'], // Example range for yield
    },
    harvestMethod: {
        type: String,
        required: [true, 'Harvest method is required'],
        enum: ['Manual', 'Mechanical'], // Allow only these methods
    },
    numberOfworkers: {
        type: Number,
        required: [true, 'Number of workers is required'],
        min: [1, 'There must be at least 1 worker'],
        max: [500, 'Number of workers cannot exceed 500'], // Example limit for workers
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('harvestSchedule', harvestScheduleSchema);
