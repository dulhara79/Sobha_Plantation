const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fertilizeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Fertilizer name is required'],
        trim: true, // Removes whitespace from both ends of the string
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], // Minimum quantity validation
    },
    storageLocation: {
        type: String,
        required: [true, 'Storage location is required'],
        trim: true,
    },
    addedDate: {
        type: Date,
        required: [true, 'Added date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date(); // Added date must be today or in the past
            },
            message: 'Added date cannot be in the future',
        },
    },
    expireDate: {
        type: Date,
        required: [true, 'Expire date is required'],
        validate: {
            validator: function(value) {
                return value > this.addedDate; // Expire date must be after added date
            },
            message: 'Expire date must be after added date',
        },
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Fertilizer', fertilizeSchema);
