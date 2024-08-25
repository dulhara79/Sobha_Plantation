const PlantGrowth = require('../models/PlantGrowth');

// Create a new plant growth entry
exports.createPlantGrowth = async (req, res) => {
  try {
    const newPlantGrowth = new PlantGrowth(req.body);
    const savedPlantGrowth = await newPlantGrowth.save();
    res.status(201).json(savedPlantGrowth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all plant growth records
exports.getAllPlantGrowthRecords = async (req, res) => {
  try {
    const plantGrowthRecords = await PlantGrowth.find();
    res.status(200).json(plantGrowthRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific plant growth record by ID
exports.getPlantGrowthById = async (req, res) => {
  try {
    const plantGrowth = await PlantGrowth.findById(req.params.id);
    if (!plantGrowth) return res.status(404).json({ message: "Plant growth record not found" });
    res.status(200).json(plantGrowth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a plant growth record
exports.updatePlantGrowth = async (req, res) => {
  try {
    const updatedPlantGrowth = await PlantGrowth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlantGrowth) return res.status(404).json({ message: "Plant growth record not found" });
    res.status(200).json(updatedPlantGrowth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a plant growth record
exports.deletePlantGrowth = async (req, res) => {
  try {
    const deletedPlantGrowth = await PlantGrowth.findByIdAndDelete(req.params.id);
    if (!deletedPlantGrowth) return res.status(404).json({ message: "Plant growth record not found" });
    res.status(200).json({ message: "Plant growth record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
