const SoilTest = require('../models/SoilTest');

// Create a new soil test entry
exports.createSoilTest = async (req, res) => {
  try {
    const newSoilTest = new SoilTest(req.body);
    const savedSoilTest = await newSoilTest.save();
    res.status(201).json(savedSoilTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all soil tests
exports.getAllSoilTests = async (req, res) => {
  try {
    const soilTests = await SoilTest.find();
    res.status(200).json(soilTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific soil test by ID
exports.getSoilTestById = async (req, res) => {
  try {
    const soilTest = await SoilTest.findById(req.params.id);
    if (!soilTest) return res.status(404).json({ message: "Soil test not found" });
    res.status(200).json(soilTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a soil test entry
exports.updateSoilTest = async (req, res) => {
  try {
    const updatedSoilTest = await SoilTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSoilTest) return res.status(404).json({ message: "Soil test not found" });
    res.status(200).json(updatedSoilTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a soil test entry
exports.deleteSoilTest = async (req, res) => {
  try {
    const deletedSoilTest = await SoilTest.findByIdAndDelete(req.params.id);
    if (!deletedSoilTest) return res.status(404).json({ message: "Soil test not found" });
    res.status(200).json({ message: "Soil test deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
