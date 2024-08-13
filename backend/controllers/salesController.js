const Sales = require("../models/Sales");

// Create a new Sales record
exports.createSales = async (req, res) => {
    try {
        const newSales = new Sales(req.body); // Use a different variable name
        await newSales.save();
        res.status(201).json(newSales);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all Sales
exports.getAllSales = async (req, res) => {
    try {
        const salesRecords = await Sales.find();  // Use a descriptive variable name
        res.status(200).json(salesRecords);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific Sales by ID
exports.getSalesById = async (req, res) => {
    try {
        const salesRecord = await Sales.findById(req.params.id);
        if (!salesRecord) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json(salesRecord);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Update a Sales record
exports.updateSales = async (req, res) => {
    try {
        const updatedSales = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json(updatedSales);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a Sales record
exports.deleteSales = async (req, res) => {
    try {
        const deletedSales = await Sales.findByIdAndDelete(req.params.id);
        if (!deletedSales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json({ message: "Sales deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
