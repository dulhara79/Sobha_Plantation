const Buyer = require("../models/Buyer");

// Create a new crop variety record
exports.createBuyer = async (req, res) => {
    try {
        const Buyer = new Buyer(req.body);
        await Buyer.save();
        res.status(201).json(Buyer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all crop varieties
exports.getAllBuyer = async (req, res) => {
    try {
        const cropVarieties = await Buyer.find();
        res.status(200).json(cropVarieties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific crop variety by ID
exports.getBuyerById = async (req, res) => {
    try {
        const Buyer = await Buyer.findById(req.params.id);
        if (!Buyer) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json(Buyer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a crop variety
exports.updateBuyer = async (req, res) => {
    try {
        const Buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Buyer) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json(Buyer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a crop variety
exports.deleteBuyer = async (req, res) => {
    try {
        const Buyer = await Buyer.findByIdAndDelete(req.params.id);
        if (!Buyer) {
            return res.status(404).json({ message: "Crop variety not found" });
        }
        res.status(200).json({ message: "Crop variety deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
