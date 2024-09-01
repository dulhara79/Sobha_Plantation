const mongoose = require('mongoose');

const salesTrackingSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    quantitySold: {
      type: Number,
      required: [true, 'Quantity sold is required'],
      min: [1, 'Quantity sold cannot be less than 1'],
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    revenueGenerated: {
      type: Number,
      required: [true, 'Revenue generated is required'],
      min: [0, 'Revenue cannot be negative'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SalesTracking', salesTrackingSchema);
