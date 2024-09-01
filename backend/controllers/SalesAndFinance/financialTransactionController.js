// controllers/financialTransactionController.js
const FinancialTransaction = require('../../models/SalesAndFinance/FinancialTransactionModel');

// Create Financial Transaction
exports.createFinancialTransaction = async (req, res, next) => {
  try {
    const transaction = await FinancialTransaction.create(req.body);
    res.status(201).json({
      success: true,
      data: transaction,
    });
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
    // console.log(transactions);
    // res.status(200).json({
    //   success: true,
    //   data: transactions,
    // });

    // console.log(transactions);

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