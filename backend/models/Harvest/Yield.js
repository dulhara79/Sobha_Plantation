const mongoose = require('mongoose');

const yieldSchema = new mongoose.Schema({
    harvestdate: {
        type: Date,
        required: true,
    },
    cropType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    treesPicked: {
        type: Number,
        required: true,
    },
    storageLocation: {
        type: String,
        required: true,
    },
    // Optional: Remove if not needed
     id: {
       type: mongoose.Schema.Types.ObjectId,
       default: () => new mongoose.Types.ObjectId(), // Generates a new ObjectId if 'id' is needed
       unique: true, // Ensure unique index if needed
       sparse: true  // Allows null values if unique index is still desired
    }
});

module.exports = mongoose.model('YieldRecords', yieldSchema);
