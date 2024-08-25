const mongoose = require("mongoose");
const harvestrecordsSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true],
        unique: true,
    },
    harvestdate: {
        type: Date,
        required: [true],                                                      
    },
    cropType: {
        type: String,
        required: [true],//Papaya,Banana,Coconut,Pepper
    },
    ageofYieldDate: {
        type: Number,
        required: [true],
    },
    quantity: {
        type: Number,
        required: [true],
    },
    wayPicked: {
        type: String,
        required: [true],//manual or mechanisms
    },
    treesPicked: {
        type: Number,
        required: [true],
    },
    storageLocation: {
        type: String,
        required: [true],
        
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('yieldrecords', harvestrecordsSchema);
