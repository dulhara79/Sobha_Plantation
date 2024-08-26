// models/SalesAnalytics.js
const mongoose = require('mongoose');

const salesAnalyticsSchema = new mongoose.Schema(
  {
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SalesTracking',
      required: [true, 'Sale reference is required'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    performanceMetrics: {
      totalRevenue: {
        type: Number,
        required: [true, 'Total revenue is required'],
        min: [0, 'Total revenue cannot be negative'],
      },
      totalUnitsSold: {
        type: Number,
        required: [true, 'Total units sold is required'],
        min: [0, 'Total units sold cannot be negative'],
      },
      averageOrderValue: {
        type: Number,
        required: [true, 'Average order value is required'],
        min: [0, 'Average order value cannot be negative'],
      },
      profitMargin: {
        type: Number,
        required: [true, 'Profit margin is required'],
        min: [0, 'Profit margin cannot be negative'],
        max: [100, 'Profit margin cannot exceed 100%'],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SalesAnalytics', salesAnalyticsSchema);
