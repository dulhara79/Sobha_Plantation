const Packaging = require("../../models/Products/packagingModel.js");

// Controller for creating a new packaging record
exports.createPackaging = async (req, res) => {
  try {
    const { productName, quantity, packagingDate, status, packagingMaterial, packagingType } = req.body;

    // Basic validation
    if (
      !productName ||
      !quantity ||
      !packagingDate ||
      !status ||
      !packagingMaterial ||
      !packagingType
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new packaging record
    const newPackaging = new Packaging({
      productName,
      quantity,
      packagingDate,
      status,
      packagingMaterial,
      packagingType,
    });

    await newPackaging.save();
    res.status(201).json({ message: "Packaging record added successfully" });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for getting all packaging records
exports.getAllPackaging = async (req, res) => {
  try {
    const packagingRecords = await Packaging.find({});
    return res.status(200).json({
      count: packagingRecords.length,
      data: packagingRecords,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching packaging records:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

// Controller for getting a single packaging record by ID
exports.getPackagingById = async (req, res) => {
  try {
    const { id } = req.params;
    const packaging = await Packaging.findById(id);

    if (!packaging) {
      return res.status(404).json({ message: "Packaging record not found" });
    }

    return res.status(200).json(packaging);
  } catch (error) {
    console.log("Error fetching packaging record:", error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for updating a packaging record
exports.updatePackaging = async (req, res) => {
  try {
    const { productName, quantity, packagingDate, status, packagingMaterial, packagingType } = req.body;

    if (
      !productName ||
      !quantity ||
      !packagingDate ||
      !status ||
      !packagingMaterial ||
      !packagingType
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: productName, quantity, packagingDate, status, packagingMaterial, packagingType",
      });
    }

    const { id } = req.params;

    const result = await Packaging.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Packaging record not found" });
    }

    return res
      .status(200)
      .send({ message: "Packaging record updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for deleting a packaging record
exports.deletePackaging = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackaging = await Packaging.findByIdAndDelete(id);

    if (!deletedPackaging) {
      return res.status(404).json({ message: "Packaging record not found" });
    }

    return res.status(200).send({ message: "Packaging record deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
