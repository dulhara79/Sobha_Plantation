const mongoose = require('mongoose');

const buyerPreOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  PreOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
    sparse: true,
  },
}, { timestamps: false });

module.exports = mongoose.model('BuyerPreOrder', buyerPreOrderSchema);
