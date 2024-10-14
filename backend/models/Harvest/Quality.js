const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
    cropType: {
        type: String,
        required: true,
        enum: ['Coconut', 'Papaya', 'Banana', 'Pineapple', 'Pepper'] // You can adjust crop types as needed
    },
    checkDate: {
        type: Date,
        required: true
    },
    qualityStatus: {
        type: String,
        enum: ['Passed', 'Failed'],
        required: true
    },
    qualityController: {
        type: String,
        required: true
    },
    parameters: {
        ripeness: {
            type: String,
            required: function () { return ['Papaya', 'Banana', 'Pineapple'].includes(this.cropType); } // Example: ripeness required for fruit crops
        },
        damage: {
            type: String,
            
        }
    }
});

module.exports = mongoose.model('HarvestQuality', qualitySchema);


