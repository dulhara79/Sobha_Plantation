
const mongoose = require('mongoose');

const requestPaymentSchema = new mongoose.Schema({

 
    section: {
        type: String,
        required: true,
      
    },
    item: {
        type: String,
        required: true,
      
    },
    amount: {
        type: Number,
        required: true
      },
    
 
    description: {
        type: String,
        required: true,
      
    },
    submitteddate: {
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
module.exports = mongoose.model('RequestPaymentRecords', requestPaymentSchema);
