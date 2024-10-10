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
    week_hours: {
      type: Number,
      required: true,
    },
    saturday_hours: {
      type: Number,
      required: true,
    },
    sunday_hours: {
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
    },
    isPaid: {
      type: Boolean,
      default: false,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SalariesRecord", FinanceSchema);