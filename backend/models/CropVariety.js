const mongoose = require("mongoose");

// Custom validation function for plantationDate (cannot be in the past)
const validatePlantationDate = (value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to ignore time in comparison
    return value >= today; // Plantation date should be today or later
};

// Custom validation for assignedPerson (only alphabets and spaces allowed)
const validateAssignedPerson = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Regular expression for alphabets and spaces
    return nameRegex.test(value); // Returns true if valid, false otherwise
};

const CropVarietySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    assignedPerson: {
        type: String,
        required: true,
        validate: {
            validator: validateAssignedPerson,
            message: "Assigned person can only contain letters and spaces.",
        },
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
        validate: {
            validator: validatePlantationDate,
            message: "Plantation date cannot be in the past.",
        },
    },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "Completed"],
        default: "Planned",
    },
});

module.exports = mongoose.model("CropVariety", CropVarietySchema);
