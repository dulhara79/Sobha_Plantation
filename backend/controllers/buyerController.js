const Buyer = require("../models/buyer");
const bcrypt = require("bcrypt");

// Create a new buyer
exports.createBuyer = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, confirmPassword, dateOfBirth, gender, contactNumber, email, district } = req.body;

    // Ensure password matches confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      district,
    });

    const savedBuyer = await newBuyer.save();
    res.status(201).json(savedBuyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all buyers
exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single buyer by ID
exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ error: "Buyer not found." });
    }
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a buyer by ID
exports.updateBuyer = async (req, res) => {
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBuyer) {
      return res.status(404).json({ error: "Buyer not found." });
    }
    res.status(200).json(updatedBuyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a buyer by ID
exports.deleteBuyer = async (req, res) => {
  try {
    const deletedBuyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!deletedBuyer) {
      return res.status(404).json({ error: "Buyer not found." });
    }
    res.status(200).json({ message: "Buyer deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
