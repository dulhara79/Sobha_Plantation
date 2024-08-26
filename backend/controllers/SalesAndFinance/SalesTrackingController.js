const SalesTracking = require('../../models/SalesAndFinance/SalesTrackingModel');

// Create a new sales tracking record
exports.createSalesTracking = async (req, res, next) => {
  try {
    const newSalesTracking = await SalesTracking.create(req.body);
    res.status(201).json({ success: true, data: newSalesTracking });
  } catch (error) {
    next(error);
  }
};

// Get all sales tracking records
exports.getAllSalesTracking = async (req, res, next) => {
  try {
    const salesTrackingRecords = await SalesTracking.find().populate('product').populate('invoice');
    res.status(200).json({ success: true, data: salesTrackingRecords });
  } catch (error) {
    next(error);
  }
};

// Get a sales tracking record by ID
exports.getSalesTrackingById = async (req, res, next) => {
  try {
    const salesTracking = await SalesTracking.findById(req.params.id).populate('product').populate('invoice');
    if (!salesTracking) {
      return res.status(404).json({ success: false, message: 'Sales tracking record not found' });
    }
    res.status(200).json({ success: true, data: salesTracking });
  } catch (error) {
    next(error);
  }
};

// Update a sales tracking record
exports.updateSalesTracking = async (req, res, next) => {
  try {
    const updatedSalesTracking = await SalesTracking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('product').populate('invoice');
    if (!updatedSalesTracking) {
      return res.status(404).json({ success: false, message: 'Sales tracking record not found' });
    }
    res.status(200).json({ success: true, data: updatedSalesTracking });
  } catch (error) {
    next(error);
  }
};

// Delete a sales tracking record
exports.deleteSalesTracking = async (req, res, next) => {
  try {
    const deletedSalesTracking = await SalesTracking.findByIdAndDelete(req.params.id);
    if (!deletedSalesTracking) {
      return res.status(404).json({ success: false, message: 'Sales tracking record not found' });
    }
    res.status(200).json({ success: true, message: 'Sales tracking record deleted successfully' });
  } catch (error) {
    next(error);
  }
};
