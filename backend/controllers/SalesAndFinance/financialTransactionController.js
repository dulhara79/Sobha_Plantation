const FinancialTransaction = require('../../models/SalesAndFinance/FinancialTransactionModel');
const { join } = require('node:path');

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