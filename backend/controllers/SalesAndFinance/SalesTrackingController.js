// Import the SalesTracking model
const SalesTracking = require('../../models/SalesAndFinance/SalesTrackingModel');

// Create a new sales tracking record
exports.createSalesTracking = async (req, res, next) => {
  try {
    const newSalesTracking = new SalesTracking(req.body); // Instantiate the model
    console.log(newSalesTracking);
    await newSalesTracking.save(); // Save to database
    res.status(201).json({ success: true, data: newSalesTracking });
  } catch (error) {
    next(error);
  }
};

// Get all sales tracking records
exports.getAllSalesTracking = async (req, res, next) => {
  try {
    const salesTrackingRecords = await SalesTracking.find();
    res.status(200).json({ success: true, data: salesTrackingRecords });
  } catch (error) {
    next(error);
  }
};

// // Get a sales tracking record by ID
// exports.getSalesTrackingById = async (req, res, next) => {
//   try {    
//     const salesTracking = await SalesTracking.findOne(req.params.id);
//     if (!salesTracking) {
//       return res.status(404).json({ success: false, message: 'Sales tracking record not found' });
//     }
//     res.status(200).json({ success: true, data: salesTracking });
//   } catch (error) {
//     next(error);
//   }
// };

// Update a sales tracking record
exports.updateSalesTracking = async (req, res, next) => {
  try {
    const updatedSalesTracking = await SalesTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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

// Get Weekly Sales Summary
exports.getWeeklySalesSummary = async (req, res) => {
  try {
    // Calculate the date from 7 days ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Fetch sales records from the last 7 days based on saleDate
    const salesAnalytics = await SalesTracking.find({
      saleDate: { $gte: oneWeekAgo },
    });

    // If no sales records are found
    if (!salesAnalytics || salesAnalytics.length === 0) {
      return res.status(404).json({ success: false, message: 'No sales found for the past week' });
    }

    // Calculate total sales revenue for the week
    const totalSales = salesAnalytics.reduce((acc, sale) => acc + sale.revenueGenerated, 0);

    // Create a map to store sales data by product
    const productSalesMap = {};

    salesAnalytics.forEach((sale) => {
      if (!productSalesMap[sale.product]) {
        productSalesMap[sale.product] = { totalQuantity: 0, totalRevenue: 0 };
      }

      // Add to total quantity and revenue for each product
      productSalesMap[sale.product].totalQuantity += sale.quantitySold;
      productSalesMap[sale.product].totalRevenue += sale.revenueGenerated;
    });

    // Get list of products
    const products = Object.keys(productSalesMap);

    // Determine the most and least selling products based on total quantity sold
    const mostSellingProduct = products.reduce((prev, curr) =>
      productSalesMap[curr].totalQuantity > productSalesMap[prev].totalQuantity ? curr : prev
    );
    const leastSellingProduct = products.reduce((prev, curr) =>
      productSalesMap[curr].totalQuantity < productSalesMap[prev].totalQuantity ? curr : prev
    );

    // Prepare the weekly sales summary response
    const weeklySummary = {
      totalSales,                       // Total sales revenue for the week
      mostSellingProduct: {
        name: mostSellingProduct,       // Most sold product
        totalQuantity: productSalesMap[mostSellingProduct].totalQuantity,
        totalRevenue: productSalesMap[mostSellingProduct].totalRevenue
      },
      leastSellingProduct: {
        name: leastSellingProduct,      // Least sold product
        totalQuantity: productSalesMap[leastSellingProduct].totalQuantity,
        totalRevenue: productSalesMap[leastSellingProduct].totalRevenue
      },
    };

    // Send the summary as a response
    res.status(200).json({ success: true, data: weeklySummary });
  } catch (error) {
    console.error('Error fetching weekly sales summary:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching weekly sales summary' });
  }
};
