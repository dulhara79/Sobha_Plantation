// const SalesAnalytics = require('../../models/SalesAndFinance/SalesAnalyticsModel');
const SalesAnalytics = require('../../models/SalesAndFinance/SalesTrackingModel');
mongoose = require('mongoose');

// Create a new sales analytics record
exports.createSalesAnalytics = async (req, res, next) => {
  try {
    const newSalesAnalytics = await SalesAnalytics.create(req.body);
    res.status(201).json({ success: true, data: newSalesAnalytics });
  } catch (error) {
    next(error);
  }
};

// Get all sales analytics records
exports.getAllSalesAnalytics = async (req, res, next) => {
  try {
    const salesAnalyticsRecords = await SalesAnalytics.find().populate('sale');
    res.status(200).json({ success: true, data: salesAnalyticsRecords });
  } catch (error) {
    next(error);
  }
};


// Get a sales analytics record by ID
exports.getSalesAnalyticsById = async (req, res, next) => {
  // try {
  //   const salesAnalytics = await SalesAnalytics.findById(req.params.id).populate('sale');
  //   if (!salesAnalytics) {
  //     return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
  //   }
  //   res.status(200).json({ success: true, data: salesAnalytics });
  // } catch (error) {
  //   next(error);
  // }

  try {
    const { id } = req.params;

    // If 'id' is not a valid ObjectId, handle it accordingly
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const salesAnalytics = await SalesAnalytics.findById(id);

    if (!salesAnalytics) {
        return res.status(404).json({ message: 'Sales Analytics not found' });
    }

    res.status(200).json({ data: salesAnalytics });
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

// Update a sales analytics record
exports.updateSalesAnalytics = async (req, res, next) => {
  try {
    const updatedSalesAnalytics = await SalesAnalytics.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('sale');
    if (!updatedSalesAnalytics) {
      return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
    }
    res.status(200).json({ success: true, data: updatedSalesAnalytics });
  } catch (error) {
    next(error);
  }
};

// Delete a sales analytics record
exports.deleteSalesAnalytics = async (req, res, next) => {
  try {
    const deletedSalesAnalytics = await SalesAnalytics.findByIdAndDelete(req.params.id);
    if (!deletedSalesAnalytics) {
      return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
    }
    res.status(200).json({ success: true, message: 'Sales analytics record deleted successfully' });
  } catch (error) {
    next(error);
  }
};


exports.getMonthlySalesSummary = async (req, res, next) => {
  try {
    // const { month } = req.query;

    const month = new Date().getMonth();    

    // Aggregate data to get total sales, most, and least selling products
    const salesSummary = await SalesAnalytics.aggregate([
      { 
        $match: { month: month }  // Assuming month is stored in a date field
      },
      {
        $group: {
          _id: "$productName",
          totalSales: { $sum: "$quantity" }
        }
      },
      {
        $sort: { totalSales: -1 }
      }
    ]);

    // Extract most and least selling products
    const mostSellingProduct = salesSummary[0]?.productName || "N/A";
    const leastSellingProduct = salesSummary[salesSummary.length - 1]?.productName || "N/A";
    const totalSales = salesSummary.reduce((acc, item) => acc + item.totalSales, 0);

    res.status(200).json({
      success: true,
      totalSales,
      mostSellingProduct,
      leastSellingProduct,
    });
  } catch (error) {
    next(error);
  }
};