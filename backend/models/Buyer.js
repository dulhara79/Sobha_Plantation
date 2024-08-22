// models/Buyer.js

const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  } //,
//   dateOfRegistration: {
//     type: Date,
//     default: Date.now
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   purchaseHistory: [{
//     itemId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Item',
//     },
//     purchaseDate: Date,
//     quantity: Number,
//     totalCost: Number,
//   }]
});

module.exports = mongoose.model('Buyer', BuyerSchema);
