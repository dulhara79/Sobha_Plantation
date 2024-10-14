const FinancialTransaction = require('../../models/SalesAndFinance/FinancialTransactionModel');
const { join } = require('node:path');
const moment = require('moment');

// helper function to get the total income and expenses
const calculateSummary = (transactions) => {
  const summary = { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 };

  transactions.forEach(transaction => {
    summary.totalTransactions += 1;
    if (transaction.type === 'income') {
      summary.totalIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      summary.totalExpenses += transaction.amount;
    }
  });

  return summary;
};

// helper function to get the total income and expenses
const calculateSummary = (transactions) => {
  const summary = { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 };

  transactions.forEach(transaction => {
    summary.totalTransactions += 1;
    if (transaction.type === 'income') {
      summary.totalIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      summary.totalExpenses += transaction.amount;
    }
  });

  return summary;
};

// Create Financial Transaction
exports.createFinancialTransaction = async (req, res, next) => {
  try {
    const transaction = new FinancialTransaction(req.body);
    console.log(transaction);
    res.status(201).json({
      success: true,
      data: transaction,
    });
    transaction.save();
  } catch (error) {
    console.log(error);    
    next(error);
  }
};

// Get All Financial Transactions
exports.getFinancialTransactions = async (req, res, next) => {
  try {
    const transactions = await FinancialTransaction.find({});
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Financial Transaction
exports.getFinancialTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.params);
    
    
    const transaction = await FinancialTransaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Financial Transaction not found',
      });
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// Update Financial Transaction
exports.updateFinancialTransaction = async (req, res, next) => {
  try {
    const transaction = await FinancialTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Financial Transaction not found',
      });
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Financial Transaction
exports.deleteFinancialTransaction = async (req, res, next) => {
  try {
    const transaction = await FinancialTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Financial Transaction not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Financial Transaction deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransactionsSummary = async (req, res) => {
  try {
    const transactions = await FinancialTransaction.find({});

    const totalTransactions = transactions.length;
    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    res.json({
      totalTransactions,
      totalIncome,
      totalExpenses
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch finance summary' });
  }
}

exports.getAllTimeBaseSummaries = async (req, res) => {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);

  const monthAgo = new Date(now);
  monthAgo.setMonth(now.getMonth() - 1);

  const yearAgo = new Date(now);
  yearAgo.setFullYear(now.getFullYear() - 1);

  try {
    // Fetch all transactions within each date range
    const weeklyTransactions = await FinancialTransaction.find({ createdAt: { $gte: weekAgo } });
    const monthlyTransactions = await FinancialTransaction.find({ createdAt: { $gte: monthAgo } });
    const yearlyTransactions = await FinancialTransaction.find({ createdAt: { $gte: yearAgo } });

    // Calculate summaries for each period
    const weeklySummary = calculateSummary(weeklyTransactions);
    const monthlySummary = calculateSummary(monthlyTransactions);
    const yearlySummary = calculateSummary(yearlyTransactions);

    console.log(weeklySummary);
    console.log(monthlySummary);
    console.log(yearlySummary);

    // Return all summaries
    res.json({ weeklySummary, monthlySummary, yearlySummary });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching summaries' });
  }
};

// Get Monthly Income and Expenses for the Year
exports.getMonthlyIncomeExpenses = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1); // Jan 1st of this year

    // Fetch all transactions from the start of the year
    const transactions = await FinancialTransaction.find({ createdAt: { $gte: startOfYear } });

    // Initialize arrays to hold income and expenses by month
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    // Calculate monthly income and expenses
    transactions.forEach(transaction => {
      const month = new Date(transaction.createdAt).getMonth(); // Get month (0 - Jan, 11 - Dec)
      if (transaction.type === 'income') {
        monthlyIncome[month] += transaction.amount;
      } else if (transaction.type === 'expense') {
        monthlyExpenses[month] += transaction.amount;
      }
    });

    res.status(200).json({
      success: true,
      monthlyIncome,
      monthlyExpenses
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch monthly income and expenses' });
  }
};


exports.predictNextMonth = async (req, res) => {
  try {
    // Get the current date
    const currentDate = moment();

    // Calculate the start and end dates for the last 3 months
    const startDate = moment(currentDate).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
    const endDate = moment(currentDate).endOf('month').format('YYYY-MM-DD');

    // Fetch transactions for the last 3 months
    const transactions = await FinancialTransaction.find({
      date: { $gte: startDate, $lte: endDate }
    });

    // Separate income and expenses
    const income = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');

    // Calculate average monthly income and expenses
    const avgMonthlyIncome = calculateAverage(income);
    const avgMonthlyExpenses = calculateAverage(expenses);

    // Predict next month's income and expenses
    const predictedIncome = predictNextMonthValue(income);
    const predictedExpenses = predictNextMonthValue(expenses);

    res.json({
      avgMonthlyIncome,
      avgMonthlyExpenses,
      predictedIncome,
      predictedExpenses
    });
  } catch (error) {
    res.status(500).json({ message: 'Error predicting next month finances', error: error.message });
  }
};

function calculateAverage(transactions) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  return total / 3; // Average over 3 months
}

function predictNextMonthValue(transactions) {
  if (transactions.length < 3) return 0;

  const monthlyTotals = [0, 0, 0];
  transactions.forEach(t => {
    const monthIndex = 2 - moment(t.date).diff(moment().subtract(3, 'months'), 'months');
    if (monthIndex >= 0 && monthIndex < 3) {
      monthlyTotals[monthIndex] += t.amount;
    }
  });

  // Simple linear regression
  const x = [1, 2, 3];
  const y = monthlyTotals;
  const n = 3;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predict next month (x = 4)
  return slope * 4 + intercept;
}
