const Invoice = require('../../models/SalesAndFinance/InvoiceModel');

// Create a new invoice
exports.createInvoice = async (req, res, next) => {
  try {
    const newInvoice = await Invoice.create(req.body);
    res.status(201).json({ success: true, data: newInvoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate('buyer').populate('items.product');
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.log(error); 
    next(error);
  }
};

// Get an invoice by ID
exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('buyer').populate('items.product');
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update an invoice
exports.updateInvoice = async (req, res, next) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('buyer').populate('items.product');
    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, data: updatedInvoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res, next) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
