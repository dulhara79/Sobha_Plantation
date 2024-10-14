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
exports.getSalesTrackingById = async (req, res, next) => {
  try {    
    const { id } = req.params;
    const salesTracking = await SalesTracking.findById(id);
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
/* exports.getWeeklySalesSummary = async (req, res) => {
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

exports.getMonthlySalesSummary = async (req, res) => {
  try {
    // Calculate the date from 7 days ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    // Fetch sales records from the last 7 days based on saleDate
    const salesAnalytics = await SalesTracking.find({
      saleDate: { $gte: oneMonthAgo },
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
 */

// Import SalesTracking Model
// const SalesTracking = require('../../models/SalesAndFinance/SalesTrackingModel');

// Get Weekly Sales Summary
exports.getWeeklySalesSummary = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const salesAnalytics = await SalesTracking.find({ saleDate: { $gte: oneWeekAgo } });

    if (!salesAnalytics.length) {
      return res.status(404).json({ success: false, message: 'No sales found for the past week' });
    }

    const productSalesMap = {};
    salesAnalytics.forEach(sale => {
      if (!productSalesMap[sale.product]) {
        productSalesMap[sale.product] = { quantitySold: 0 };
      }
      productSalesMap[sale.product].quantitySold += sale.quantitySold;
    });

    const mostSoldProducts = Object.keys(productSalesMap).map(product => ({
      product,
      quantitySold: productSalesMap[product].quantitySold,
    }));

    const from = new Date(oneWeekAgo).toDateString();
    // console.log("from: ", from);
    res.status(200).json({ from: from, mostSoldProducts });
  } catch (error) {
    console.error('Error fetching weekly sales summary:', error);
    res.status(500).json({ success: false, message: 'Error fetching weekly sales summary' });
  }
};

// Get Monthly Sales Summary
exports.getMonthlySalesSummary = async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); // Get sales from one year ago

    // Get sales data from one year ago until now
    const salesAnalytics = await SalesTracking.find({ saleDate: { $gte: oneYearAgo } });

    if (!salesAnalytics.length) {
      return res.status(404).json({ success: false, message: 'No sales found for the past year' });
    }

    const productSalesMap = {};
    const monthlyRevenueMap = {};
    const monthlyProductSalesMap = {};

    salesAnalytics.forEach((sale) => {
      const saleMonthYear = `${sale.saleDate.getFullYear()}-${sale.saleDate.getMonth() + 1}`; // Create "YYYY-MM" format

      // Track product quantity sold
      if (!productSalesMap[sale.product]) {
        productSalesMap[sale.product] = { quantitySold: 0 };
      }
      productSalesMap[sale.product].quantitySold += sale.quantitySold;

      // Track monthly revenue
      if (!monthlyRevenueMap[saleMonthYear]) {
        monthlyRevenueMap[saleMonthYear] = { totalRevenue: 0 };
      }
      monthlyRevenueMap[saleMonthYear].totalRevenue += sale.revenueGenerated;

      // Track monthly sold quantity by product
      if (!monthlyProductSalesMap[saleMonthYear]) {
        monthlyProductSalesMap[saleMonthYear] = {};
      }
      if (!monthlyProductSalesMap[saleMonthYear][sale.product]) {
        monthlyProductSalesMap[saleMonthYear][sale.product] = { quantitySold: 0 };
      }
      monthlyProductSalesMap[saleMonthYear][sale.product].quantitySold += sale.quantitySold;
    });

    // Most sold products overall
    const mostSoldProducts = Object.keys(productSalesMap).map((product) => ({
      product,
      quantitySold: productSalesMap[product].quantitySold,
    }));

    // Monthly revenue summary
    const monthlySales = Object.keys(monthlyRevenueMap).map((month) => ({
      month,
      totalRevenue: monthlyRevenueMap[month].totalRevenue,
    }));

    // Monthly sold product quantities
    const monthlyProductSales = Object.keys(monthlyProductSalesMap).map((month) => ({
      month,
      products: Object.keys(monthlyProductSalesMap[month]).map((product) => ({
        product,
        quantitySold: monthlyProductSalesMap[month][product].quantitySold,
      })),
    }));

    // res.status(200).json({ success: true, data: {mostSoldProducts: mostSoldProducts, monthlySales: monthlySales, monthlyProductSales: monthlyProductSales} });
    res.status(200).json({ success: true, mostSoldProducts, monthlySales, monthlyProductSales });
  } catch (error) {
    console.error('Error fetching monthly sales summary:', error);
    res.status(500).json({ success: false, message: 'Error fetching monthly sales summary' });
  }
};


/**
 * Get Yearly Revenue Summary
 * Returns total revenue generated per month over the past year.
 */
exports.getYearlyRevenueSummary = async (req, res) => {
  try {
    const currentDate = new Date();
    console.log("current date: ", currentDate);
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    oneYearAgo.setDate(1); // Start from the first day of the month

    const revenueData = await SalesTracking.aggregate([
      {
        $match: {
          saleDate: { $gte: oneYearAgo, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: { year: { $year: '$saleDate' }, month: { $month: '$saleDate' } },
          totalRevenue: { $sum: '$revenueGenerated' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    // Generate a list of the past 12 months
    const months = [];
    for (let i = 0; i <= 12; i++) {
      const date = new Date(oneYearAgo.getFullYear(), oneYearAgo.getMonth() + i, 1);
      const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      months.push(monthName);
    }

    // Map the aggregated data to the months
    const revenueMap = {};
    revenueData.forEach((item) => {
      const date = new Date(item._id.year, item._id.month - 1, 1);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      revenueMap[month] = item.totalRevenue;
    });

    // Prepare the final data array
    const formattedData = months.map((month) => ({
      month,
      totalRevenue: revenueMap[month] || 0,
    }));

    res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Error fetching yearly revenue summary:', error);
    res.status(500).json({ success: false, message: 'Error fetching yearly revenue summary' });
  }
};

exports.getMonthSalecardSummary = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const currentYear = new Date().getFullYear();

    const monthlySummary = await SalesTracking.aggregate([
      // Filter to include only records from the current month and year
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$saleDate" }, currentMonth] },
              { $eq: [{ $year: "$saleDate" }, currentYear] }
            ]
          }
        }
      },
      // Group data to calculate total sales and identify products
      {
        $group: {
          _id: "$product",
          totalSales: { $sum: "$revenueGenerated" },
          quantitySold: { $sum: "$quantitySold" }
        }
      },
      // Sort by quantitySold to find the most and least selling products
      { $sort: { quantitySold: -1 } }
    ]);

    // Extract most and least selling products after sorting
    // const totalSales = monthlySummary.reduce((acc, item) => acc + item.totalSales, 0);
    const totalSales = monthlySummary.length;
    const mostSellingProduct = monthlySummary[0]?._id || "No data";
    const leastSellingProduct = monthlySummary[monthlySummary.length - 1]?._id || "No data";

    res.status(200).json({ data: {
      totalSales,
      mostSellingProduct,
      leastSellingProduct }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly summary", error });
  }
};