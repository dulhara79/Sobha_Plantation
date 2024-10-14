// const mongoose = require("mongoose");
// const FinanceSchema = mongoose.Schema(
//   {
//     payment_date: {
//       type: String,
//       required: true,
//     },
//     emp_name: {
//       type: String,
//       required: true,
//     },
//     salary_start_date: {
//       type: String,
//       required: true,
//     },
//     salary_end_date: {
//       type: String,
//       required: true,
//     },
//     nic: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     basic_days: {
//       type: Number,
//       required: true,
//     },
//     basic_rate: {
//       type: Number,
//       required: true,
//     },
//     bonus_salary: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     week_hours: {
//       type: Number,
//       required: true,
//     },
//     saturday_hours: {
//       type: Number,
//       required: true,
//     },
//     sunday_hours: {
//       type: Number,
//       required: true,
//     },
//     ot_rate: {
//       type: Number,
//       required: true,
//     },
//     epf_etf: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     isPaid: {
//       type: Boolean,
//       default: false,
//     },
//     netSalary: {
//       type: Number,
//       required: true,
//     },
//     partialPayment: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("SalariesRecord", FinanceSchema);

// Import Mongoose
const mongoose = require("mongoose");

// Define the schema for employee salary details
const FinanceSchema = new mongoose.Schema(
  {
    emp_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Permanent", "Contract", "Part-Time"],
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
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
      default: 0,
    },
    epf_deduction: {
      type: Number,
      default: 0,
    },
    etf_contribution: {
      type: Number,
      default: 0,
    },
    fullMonthSalary: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    ot_rate: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    salary_end_date: {
      type: Date,
      required: true,
    },
    salary_start_date: {
      type: Date,
      required: true,
    },
    after_hours: {
      type: Number,
      required: true,
    },
    saturday_hours: {
      type: Number,
      default: 0,
    },
    sunday_hours: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    partialPayment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const SalariesRecord = mongoose.model("SalariesRecord", FinanceSchema);

module.exports = SalariesRecord;
