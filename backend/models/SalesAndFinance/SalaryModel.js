const mongoose = require ("mongoose");
const FinanceSchema = mongoose.Schema(
  {
    payment_date: {
      type: String,
      required: true,
    },
    emp_name: {
      type: String,
      required: true,
    },
    salary_start_date: {
      type: String,
      required: true,
    },
    salary_end_date: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    basic_days: {
      type: Number,
      required: true,
    },
    basic_rate: {
      type: Number,
      required: true,
    },
    bonus_salary: {
      type: Number,
      required: true,
    },
    ot_hours: {
      type: Number,
      required: true,
    },
    ot_rate: {
      type: Number,
      required: true,
    },
    epf_etf: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export const SalariesRecord = mongoose.model("SalariesRecord", FinanceSchema);
module.exports = mongoose.model("SalariesRecord", FinanceSchema);