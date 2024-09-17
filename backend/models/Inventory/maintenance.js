const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({

    reffereddate: {
        type: Date,
        required: true,
        
    },
    eqname: {
        type: String,
        required: true,
      
    },
    quantity: {
        type: Number,
        required: true,
     
    },
    referredlocation: {
        type: String,
        required: true,
      
    },
    receiveddate: {
        type: Date,
        required: true,
       
    },
    status: {
        type: String,
        required: true,
      
    },
    // Remove or adjust this field as needed
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Generates a new ObjectId if 'id' is needed
        unique: true, // Ensure unique index if needed
        sparse: true  // Allows null values if unique index is still desired
    }
});

// Export the model with a singular name
module.exports = mongoose.model('MaintenanceRecords', maintenanceSchema);
