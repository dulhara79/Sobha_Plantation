// validations/invoiceValidation.js
// const Joi = require('joi');
// const mongoose = require('mongoose');

// const invoiceSchema = Joi.object({
//   buyer: Joi.string()
//     .custom((value, helpers) => {
//       if (!mongoose.Types.ObjectId.isValid(value)) {
//         return helpers.error('any.invalid');
//       }
//       return value;
//     })
//     .required(),
//   totalAmount: Joi.number().positive().required(),
//   invoiceDate: Joi.date().optional(),
//   dueDate: Joi.date().greater(Joi.ref('invoiceDate')).required(),
//   items: Joi.array()
//     .items(
//       Joi.object({
//         product: Joi.string()
//           .custom((value, helpers) => {
//             if (!mongoose.Types.ObjectId.isValid(value)) {
//               return helpers.error('any.invalid');
//             }
//             return value;
//           })
//           .required(),
//         quantity: Joi.number().integer().min(1).required(),
//         price: Joi.number().positive().required(),
//       })
//     )
//     .min(1)
//     .required(),
//   status: Joi.string().valid('Pending', 'Paid', 'Overdue').optional(),
// });

// module.exports = { invoiceSchema };

const Joi = require('joi');
const invoiceSchema = Joi.object({
  buyer: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid buyer ID');
      }
      return value;
    })
    .required(),
  totalAmount: Joi.number().positive().required(),
  invoiceDate: Joi.date().optional(),
  dueDate: Joi.date().greater(Joi.ref('invoiceDate')).required(),
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.message('Invalid product ID');
            }
            return value;
          })
          .required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
  status: Joi.string().valid('Pending', 'Paid', 'Overdue').optional(),
});

module.exports = { invoiceSchema };

