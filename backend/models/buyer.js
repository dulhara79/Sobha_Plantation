const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  userName: { type: String, required: true, unique: true, match: /^[A-Za-z]+$/ },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  contactNumber: { type: String, required: true, match: /^[\d+]+$/ },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  district: { type: String, required: true, match: /^[A-Za-z\s]+$/ },
}, { timestamps: true });

module.exports = mongoose.model("Buyer", buyerSchema);
