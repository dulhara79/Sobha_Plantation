// controllers/labelingController.js
const Labeling = require('../../models/Products/labelingModel');

// Create a new labeling entry
exports.createLabeling = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body for debugging

    const { productName, labelingDate, status, quantity } = req.body;

    // Basic validation
    if (!productName || !labelingDate || !status || quantity === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new labeling entry
    const newLabeling = new Labeling({
      productName,
      labelingDate,
      status,
      quantity,
    });

    await newLabeling.save();
    res.status(201).json({ message: "Labeling entry added successfully", data: newLabeling });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get all labeling entries
exports.getAllLabelings = async (req, res) => {
  try {
    const labelings = await Labeling.find({});
    return res.status(200).json({
      count: labelings.length,
      data: labelings,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching labelings:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get a single labeling entry by ID
exports.getLabelingById = async (req, res) => {
  try {
    const { id } = req.params;
    const labeling = await Labeling.findById(id);

    if (!labeling) {
      return res.status(404).json({ message: "Labeling entry not found" });
    }

    return res.status(200).json(labeling);
  } catch (error) {
    console.log("Error fetching labeling entry:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update a labeling entry
exports.updateLabeling = async (req, res) => {
  try {
    const { productName, labelingDate, status, quantity } = req.body;

    if (!productName || !labelingDate || !status || quantity === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { id } = req.params;

    const updatedLabeling = await Labeling.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedLabeling) {
      return res.status(404).json({ message: "Labeling entry not found" });
    }

    return res.status(200).json({ message: "Labeling entry updated successfully", data: updatedLabeling });
  } catch (error) {
    console.log("Error updating labeling entry:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete a labeling entry
exports.deleteLabeling = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLabeling = await Labeling.findByIdAndDelete(id);

    if (!deletedLabeling) {
      return res.status(404).json({ message: "Labeling entry not found" });
    }

    return res.status(200).json({ message: "Labeling entry deleted successfully" });
  } catch (error) {
    console.log("Error deleting labeling entry:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
