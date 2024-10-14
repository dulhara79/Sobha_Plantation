const MinorTransactionsRecord = require("../../models/SalesAndFinance/MinorTransactions");

// Create Financial Transaction
exports.createFinancialTransaction = async (req, res, next) => {
  try {
    const transaction = new MinorTransactionsRecord(req.body);
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
    const transactions = await MinorTransactionsRecord.find({});
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
    
    
    const transaction = await MinorTransactionsRecord.findById(req.params.id);
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
    const transaction = await MinorTransactionsRecord.findByIdAndUpdate(
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
    const transaction = await MinorTransactionsRecord.findByIdAndDelete(req.params.id);
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