const CropVariety = require("../models/CropVariety");

// Create a new crop variety record
exports.createCropVariety = async (req, res) => {
    try {
        const cropVariety = new CropVariety(req.body);
        await cropVariety.save();
        res.status(201).json(cropVariety);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all crop varieties
exports.getAllCropVarieties = async (req, res) => {
    try {
        const cropVarieties = await CropVariety.find();
        res.status(200).json(cropVarieties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific crop variety by ID
exports.getCropVarietyById = async (req, res) => {
    try {
        const cropVariety = await CropVariety.findById(req.params.id);
        if (!cropVariety) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json(cropVariety);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a crop variety
exports.updateCropVariety = async (req, res) => {
    try {
        const cropVariety = await CropVariety.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cropVariety) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json(cropVariety);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a crop variety
exports.deleteCropVariety = async (req, res) => {
    try {
        const cropVariety = await CropVariety.findByIdAndDelete(req.params.id);
        if (!cropVariety) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json({ message: "Crop variety deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
