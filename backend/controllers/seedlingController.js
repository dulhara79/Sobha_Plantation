const Seedling = require("../models/Seedling");

// Get all seedlings
exports.getSeedlings = async (req, res) => {
  try {
    const seedlings = await Seedling.find();
    res.status(200).json(seedlings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new seedling
exports.addSeedling = async (req, res) => {
  try {
    const { seedlingType, currentQuantity, minStock } = req.body;

    const seedling = new Seedling({
      seedlingType,
      currentQuantity,
      minStock,
    });

    await seedling.save();
    res.status(201).json(seedling);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update seedling quantity or status
exports.updateSeedling = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const seedling = await Seedling.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json(seedling);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a seedling
exports.deleteSeedling = async (req, res) => {
  try {
    const { id } = req.params;

    await Seedling.findByIdAndDelete(id);

    res.status(200).json({ message: "Seedling deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
