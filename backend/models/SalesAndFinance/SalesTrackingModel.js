const mongoose = require('mongoose');

// Define the schema
const salesTrackingSchema = new mongoose.Schema(
  {
    product: {
      type: String, // Use product name as string
      required: [true, 'Product is required'],
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    quantitySold: {
      type: Number,
      required: [true, 'Quantity sold is required'],
      min: [1, 'Quantity sold cannot be less than 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
    },
    revenueGenerated: {
      type: Number,
      required: [true, 'Revenue generated is required'],
      min: [0, 'Revenue cannot be negative'],
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model('SalesTracking', salesTrackingSchema);
