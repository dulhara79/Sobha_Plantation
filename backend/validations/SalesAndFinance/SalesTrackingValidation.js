// validations/salesTrackingValidation.js
const Joi = require('joi');
const mongoose = require('mongoose');

const salesTrackingSchema = Joi.object({
  product: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
  quantitySold: Joi.number().integer().min(1).required(),
  saleDate: Joi.date().optional(),
  revenueGenerated: Joi.number().positive().required(),
  invoice: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
});

module.exports = { salesTrackingSchema };
