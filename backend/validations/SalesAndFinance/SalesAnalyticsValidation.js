// validations/salesAnalyticsValidation.js
const Joi = require('joi');
const mongoose = require('mongoose');

const salesAnalyticsSchema = Joi.object({
  sale: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required(),
  date: Joi.date().optional(),
  performanceMetrics: Joi.object({
    totalRevenue: Joi.number().positive().required(),
    totalUnitsSold: Joi.number().integer().min(0).required(),
    averageOrderValue: Joi.number().positive().required(),
    profitMargin: Joi.number().min(0).max(100).required(),
  }).required(),
});

module.exports = { salesAnalyticsSchema };
