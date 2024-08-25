// validations/financialTransactionValidation.js
const Joi = require('joi');
const mongoose = require('mongoose');

const financialTransactionSchema = Joi.object({
  transactionType: Joi.string().valid('Credit', 'Debit').required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().optional(),
  associatedEntity: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
  entityModel: Joi.string().valid('Buyer', 'Supplier', 'Employee', 'Other').required(),
  description: Joi.string().max(500).optional(),
});

module.exports = { financialTransactionSchema };
