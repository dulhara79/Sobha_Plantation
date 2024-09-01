const mongoose = require('mongoose');
const ComplianceCheck = require('../../models/Harvest/Compliance'); // Ensure this path is correct

// Create a new compliance check
exports.createComplianceCheck = async (req, res) => {
  try {
    const { criteriaName, description, isActive, lastUpdated } = req.body;

    // Validate required fields
    if (!criteriaName || !description || isActive === undefined || !lastUpdated) {
      return res.status(400).json({
        message: 'Please provide all required fields: criteriaName, description, isActive, lastUpdated',
      });
    }

    // Create a new compliance check
    const complianceCheck = new ComplianceCheck({
      criteriaName,
      description,
      isActive,
      lastUpdated,
    });

    // Save the compliance check to the database
    const savedComplianceCheck = await complianceCheck.save();
    return res.status(201).json(savedComplianceCheck);
  } catch (error) {
    console.error('Error creating compliance check:', error);
    res.status(500).json({ message: 'Failed to create compliance check.', error: error.message });
  }
};

// Get all compliance checks
exports.getAllComplianceChecks = async (req, res) => {
  try {
    const complianceChecks = await ComplianceCheck.find({});
    return res.status(200).json({
      count: complianceChecks.length,
      data: complianceChecks,
    });
  } catch (error) {
    console.error('Error fetching compliance checks:', error);
    res.status(500).json({ message: 'Failed to fetch compliance checks.', error: error.message });
  }
};

// Get a single compliance check by Id
exports.getComplianceCheckById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const complianceCheck = await ComplianceCheck.findById(id);

    if (!complianceCheck) {
      return res.status(404).json({ message: 'Compliance check not found' });
    }

    return res.status(200).json(complianceCheck);
  } catch (error) {
    console.error('Error fetching compliance check by id:', error);
    res.status(500).json({ message: 'Failed to fetch compliance check.', error: error.message });
  }
};

// Update a compliance check by Id
exports.updateComplianceCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const { criteriaName, description, isActive, lastUpdated } = req.body;

    // Check for a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    // Ensure all required fields are present
    if (!criteriaName || !description || isActive === undefined || !lastUpdated) {
      return res.status(400).json({
        message: 'Please provide all required fields: criteriaName, description, isActive, lastUpdated',
      });
    }

    // Update the compliance check
    const updatedComplianceCheck = await ComplianceCheck.findByIdAndUpdate(
      id,
      { criteriaName, description, isActive, lastUpdated },
      { new: true, runValidators: true }
    );

    // Handle case where compliance check is not found
    if (!updatedComplianceCheck) {
      return res.status(404).json({ message: 'Compliance check not found' });
    }

    // Successfully updated the compliance check
    return res.status(200).json({ message: 'Compliance check updated successfully', data: updatedComplianceCheck });
  } catch (error) {
    console.error('Error updating compliance check:', error);
    res.status(500).json({ message: 'Failed to update compliance check.', error: error.message });
  }
};

// Delete a compliance check by Id
exports.deleteComplianceCheck = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const deletedComplianceCheck = await ComplianceCheck.findByIdAndDelete(id);

    if (!deletedComplianceCheck) {
      return res.status(404).json({ message: 'Compliance check not found' });
    }

    return res.status(200).json({ message: 'Compliance check deleted successfully' });
  } catch (error) {
    console.error('Error deleting compliance check:', error.message);
    res.status(500).json({ message: 'Failed to delete compliance check.', error: error.message });
  }
};
