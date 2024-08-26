const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Salary Employee Schema
const SalaryEmployeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
   /* validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'Employee Name should only contain alphabetic characters.'
    }*/
  },
  nic: {
    type: String,
    required: true,
    unique: true,
   /* validate: {
      validator: function (v) {
        return /^\d{9}$/.test(v);
      },
      message: 'NIC must be 9 digits long.'
    }*/
  },
  type: {
    type: String,
    enum: ['Permanent', 'Contractual', 'Part-Time'],
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    /*validate: {
      validator: function (v) {
        return !isNaN(new Date(v).getTime());
      },
      message: 'Start Date is not valid.'
    }*/
  },
  endDate: {
    type: Date,
    required: true,
   /* validate: {
      validator: function (v) {
        const startDate = this.startDate;
        return !isNaN(new Date(v).getTime()) && new Date(v) > new Date(startDate);
      },
      message: 'End Date must be after Start Date and should be a valid date.'
    }*/
  },
  basicDays: {
    type: Number,
    min: 1,
    max: 31,
    required: true
  },
  basicRate: {
    type: Number,
    min: 0,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  otHours: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  otRate: {
    type: Number,
    min: 0,
    required: true
  },
  etfEpf: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return new Date(v) >= new Date();
      },
      message: 'Payment Date cannot be in the past.'
    }
  },
  remark: {
    type: String,
    maxlength: 200
  }
});

module.exports = mongoose.model('SalaryEmployee', SalaryEmployeeSchema);
