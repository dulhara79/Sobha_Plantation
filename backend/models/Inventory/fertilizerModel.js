const mongoose = require("mongoose");

const fertilizerSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Fertilizer ID is required'],
        unique: true,
        trim: true, // Removes whitespace from both ends of the string
        minlength: [3, 'Fertilizer ID must be at least 3 characters long'], // Minimum length validation
    },
    addingdate: {
        type: Date,
        required: [true, 'Adding date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date(); // Added date must be today or in the past
            },
            message: 'Added date cannot be in the future',
        },
    },
    type: {
        type: String,
        required: [true, "Fertilizer type is required."],
        enum: {
          values: ["Papaya", "Banana", "Coconut", "Pepper","Pineapple"],
          message: "{VALUE} is not a valid crop type.",
        },
      },

    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], // Minimum quantity validation
        max: [100000, 'Quantity cannot exceed 100,000'], // Maximum quantity validation
    },
    storagelocation: {
        type: String,
        required: [true, 'Storage location is required'],
        trim: true, // Removes whitespace from both ends of the string
        minlength: [3, 'Storage location must be at least 3 characters long'], // Minimum length validation
    },
    
    expiredate: {
        type: Date,
        required: [true, 'Expire date is required'],
        validate: {
            validator: function(value) {
                return value > this.addeddate; // Expire date must be after added date
            },
            message: 'Expire date must be after the added date',
        },
    },
    actions: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed'],
        default: 'Scheduled',
      },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("fertilizers", fertilizerSchema);
