const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^\d{10}$/, 'Contact number must be 10 digits'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    unique: true,
  },
  nic: {
    type: String,
    required: [true, 'NIC is required'],
    match: [/^([0-9]{9}[vVxX]|[0-9]{12})$/, 'Invalid NIC format'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  employeeType: {
    type: String,
    required: [true, 'Employee type is required'],
  },
  hiredDate: {
    type: Date,
    required: [true, 'Hired date is required'],
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: [0, 'Hourly rate must be a positive number'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
