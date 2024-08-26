const mongoose = require('mongoose');

const FinancialTransactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: {
        values: ['Credit', 'Debit', 'Other'],
        message: 'Transaction type must be Credit, Debit, or Other',
      },
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    associatedEntity: {
      type: mongoose.Schema.Types.Mixed, // Can reference different entities like Buyer, Supplier, etc.
      required: [true, 'Associated entity is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FinancialTransaction', FinancialTransactionSchema);
