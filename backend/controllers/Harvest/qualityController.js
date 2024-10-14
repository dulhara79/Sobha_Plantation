const QualityControl = require("../../models/Harvest/Quality.js");

// Controller for creating a quality control report
exports.createQualityControl = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body for debugging

    const { cropType, checkDate, qualityStatus, qualityController, parameters } = req.body;

    // Basic validation: Ensure all required fields are provided
    if (!cropType || !checkDate || !qualityStatus || qualityController === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate cropType and parameters
    const validCrops = ['Coconut', 'Papaya', 'Banana', 'Pineapple', 'Pepper'];
    if (!validCrops.includes(cropType)) {
      return res.status(400).json({ error: `Invalid crop type. Allowed types: ${validCrops.join(", ")}` });
    }

    if (['Papaya', 'Banana', 'Pineapple'].includes(cropType) && (!parameters || !parameters.ripeness)) {
      return res.status(400).json({ error: `Ripeness is required for ${cropType}` });
    }

    // Create new inspection report
    const newInspectionReport = new QualityControl({
      cropType,
      checkDate,
      qualityStatus,
      qualityController,
      parameters: {
        ripeness: parameters?.ripeness,
        damage: parameters?.damage || false, // Default to false if not provided
      }
    });

    await newInspectionReport.save();
    res.status(201).json({ message: "Inspection Report added successfully", report: newInspectionReport });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Controller for getting all quality control reports
exports.getAllQualityControl = async (req, res) => {
  try {
    const reports = await QualityControl.find({});
    return res.status(200).json({
      count: reports.length,
      data: reports,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching reports:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

// Controller for getting a single quality control report by ID
exports.getQualityControlById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await QualityControl.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.log("Error fetching report:", error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for updating an inspection report
exports.updateQualityControl = async (req, res) => {
  try {
    const { cropType, checkDate, qualityStatus, qualityController, parameters } = req.body;

    // Validate required fields
    if (!cropType || !checkDate || !qualityStatus || qualityController === undefined) {
      return res.status(400).send({
        message: "Send all required fields: cropType, checkDate, qualityStatus, qualityController",
      });
    }

    // Validate cropType and parameters
    const validCrops = ['Coconut', 'Papaya', 'Banana', 'Pineapple', 'Pepper'];
    if (!validCrops.includes(cropType)) {
      return res.status(400).json({ error: `Invalid crop type. Allowed types: ${validCrops.join(", ")}` });
    }

    if (['Papaya', 'Banana', 'Pineapple'].includes(cropType) && (!parameters || !parameters.ripeness)) {
      return res.status(400).json({ error: `Ripeness is required for ${cropType}` });
    }

    const { id } = req.params;

    // Update the report
    const report = await QualityControl.findByIdAndUpdate(id, {
      cropType,
      checkDate,
      qualityStatus,
      qualityController,
      parameters: {
        
        ripeness: parameters?.ripeness,
        damage: parameters?.damage || false,
      }
    }, { new: true });

    if (!report) {
      return res.status(404).json({ message: "Inspection report not found" });
    }

    return res.status(200).send({ message: "Inspection Report updated successfully", report });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for deleting an inspection report
exports.deleteQualityControl = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await QualityControl.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).send({ message: "Inspection Report deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
