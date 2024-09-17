const mongoose = require("mongoose");

const FinanceSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    subtype: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    payer_payee: {
      type: String,
      required: false,
    },
    appreciationOrDepreciation: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// export const ValuationsRecord = mongoose.model(
//   "ValuationsRecord",
//   FinanceSchema
// );

const ValuationsRecord = mongoose.model("ValuationsRecord", FinanceSchema);
module.exports = ValuationsRecord;