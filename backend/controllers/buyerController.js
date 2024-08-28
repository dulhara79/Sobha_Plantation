// controllers/buyerController.js
const Buyer = require('../models/buyer');
const bcrypt = require('bcryptjs');
 
// Create a new buyer
exports.registerBuyer = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, confirmPassword, dateOfBirth, gender, contactNumber, emailAddress } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if buyer already exists
    const existingBuyer = await Buyer.findOne({ emailAddress });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Buyer already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new buyer instance
    const buyer = new Buyer({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      dateOfBirth,
      gender,
      contactNumber,
      emailAddress
    });

    // Save buyer to the database
    await buyer.save();
    res.status(201).json({ message: 'Buyer registered successfully', buyer });
  } catch (error) {
    res.status(500).json({ message: 'Error registering buyer', error });
  }
};
