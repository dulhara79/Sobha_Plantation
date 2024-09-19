// // controllers/financeController.js

// const TransactionsRecord = require('../../models/SalesAndFinance/FinancialTransactionModel'); // Adjust path as needed

// // Get Monthly Financial Analytics
// exports.getMonthlyAnalytics = async (req, res) => {
//   try {
//     const results = await TransactionsRecord.aggregate([
//       {
//         $group: {
//           _id: { $month: { $dateFromString: { dateString: "$date" } } },
//           totalIncome: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
//             }
//           },
//           totalExpenses: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
//             }
//           }
//         }
//       },
//       { $sort: { _id: 1 } } // Sort by month
//     ]);

//     res.json(results.map(month => ({
//       name: `Month ${month._id}`,
//       income: month.totalIncome,
//       expenses: month.totalExpenses
//     })));
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching monthly analytics', error });
//   }
// };

// // Get Yearly Sales Analytics
// exports.getYearlySalesAnalytics = async (req, res) => {
//   try {
//     const results = await TransactionsRecord.aggregate([
//       {
//         $group: {
//           _id: { $year: { $dateFromString: { dateString: "$date" } } },
//           totalSales: {
//             $sum: {
//               $cond: [{ $eq: ["$type", "sales"] }, "$amount", 0]
//             }
//           }
//         }
//       },
//       { $sort: { _id: 1 } } // Sort by year
//     ]);

//     res.json(results.map(year => ({
//       month: `Year ${year._id}`,
//       sales: year.totalSales
//     })));
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching yearly sales analytics', error });
//   }
// };

// // Get Weekly Product Performance Analytics
// exports.getWeeklyProductPerformance = async (req, res) => {
//   try {
//     const results = await TransactionsRecord.aggregate([
//       {
//         $group: {
//           _id: { $week: { $dateFromString: { dateString: "$date" } } },
//           totalAmount: {
//             $sum: "$amount"
//           }
//         }
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "week",
//           as: "productDetails"
//         }
//       },
//       {
//         $unwind: "$productDetails"
//       },
//       {
//         $project: {
//           _id: 0,
//           product: "$productDetails.name",
//           value: "$totalAmount",
//           color: "$productDetails.color"
//         }
//       }
//     ]);

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product performance', error });
//   }
// };

// controllers/financeController.js
const TransactionsRecord = require("../../models/SalesAndFinance/FinancialTransactionModel");

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await TransactionsRecord.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

// Get summary cards data
exports.getSummary = async (req, res) => {
  try {
    const totalTransactions = await TransactionsRecord.countDocuments();
    const totalIncome = await TransactionsRecord.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = await TransactionsRecord.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      totalTransactions,
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve summary data", error });
  }
};

// Get balance sheet data
exports.getBalanceSheet = async (req, res) => {
  try {
    const assets = await TransactionsRecord.find({ subtype: "Asset" });
    const liabilities = await TransactionsRecord.find({ subtype: "Liability" });

    const totalAssets = assets.reduce((acc, item) => acc + item.amount, 0);
    const totalLiabilities = liabilities.reduce((acc, item) => acc + item.amount, 0);

    res.status(200).json({
      assets,
      liabilities,
      equity: totalAssets - totalLiabilities,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve balance sheet data", error });
  }
};

// Get cashbook data
exports.getCashbook = async (req, res) => {
  try {
    const transactions = await TransactionsRecord.find().sort({ date: 1 });
    let balance = 0;
    const cashbook = transactions.map(transaction => {
      balance += transaction.type === "income" ? transaction.amount : -transaction.amount;
      return { ...transaction._doc, balance };
    });

    res.status(200).json(cashbook);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cashbook data", error });
  }
};

const moment = require('moment');

// Helper function to calculate totals
const calculateTotals = (transactions) => {
  let totalTransactions = transactions.length;
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  });

  return { totalTransactions, totalIncome, totalExpenses };
};

// Controller to get weekly, monthly, and yearly summaries
exports.getFinancialSummary = async (req, res) => {
  try {
    const now = moment();
    const startOfWeek = moment().startOf('isoWeek').toDate(); // Start of ISO week
    const startOfMonth = moment().startOf('month').toDate();
    const startOfYear = moment().startOf('year').toDate();

    console.log("startOfWeek", startOfWeek);
    console.log("startOfMonth", startOfMonth);
    console.log("startOfYear", startOfYear);
    
    // Fetch transactions within the specified timeframes
    const [ monthlyTransactions, yearlyTransactions] = await Promise.all([
      // TransactionsRecord.find({ date: { $gte: startOfWeek, $lte: now.toDate() } }),
      TransactionsRecord.find({ date: { $gte: startOfMonth, $lte: now.toDate() } }),
      TransactionsRecord.find({ date: { $gte: startOfYear, $lte: now.toDate() } }),
    ]);

    const weeklyTransactions = await TransactionsRecord.find({ date: { $gte: startOfWeek, $lte: now.toDate() } });
    console.log("weeklyTransactions", weeklyTransactions);
    console.log("{ date: { $gte: startOfWeek, $lte: now.toDate() } }", { date: { $gte: startOfWeek, $lte: now.toDate() } });
    console.log("TransactionRecord", TransactionsRecord);
    // console.log("TransactionsRecord.find({ date: { $gte: startOfWeek, $lte: now.toDate() } })", TransactionsRecord.find({ date: { $gte: startOfWeek, $lte: now.toDate() } }));
    

    const weeklySummary = calculateTotals(weeklyTransactions);
    const monthlySummary = calculateTotals(monthlyTransactions);
    const yearlySummary = calculateTotals(yearlyTransactions);

    res.status(200).json({
      weeklySummary,
      monthlySummary,
      yearlySummary,
    });

    console.log("weeklySummary", weeklySummary);
    console.log("monthlySummary", monthlySummary);
    console.log("yearlySummary", yearlySummary);
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial summary', error });
  }
};