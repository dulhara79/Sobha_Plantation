const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    match: [/^[A-Za-z]+$/, 'First name should only contain letters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    match: [/^[A-Za-z]+$/, 'Last name should only contain letters'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    // Custom validation logic for matching NIC and DOB will be handled in the controller or middleware
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female'],
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
    match: [/^[A-Za-z0-9\s,/-]+$/, 'Address can contain letters, numbers, spaces, commas, and slashes'],
  },
  employeeType: {
    type: String,
    required: [true, 'Employee type is required'],
    enum: ['Permanent', 'Contract'],  // Only Permanent or Contract allowed
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    enum: ['Farmer', 'Security', 'Pest and Disease Expert'],  // Relevant designations for coconut cultivation
  },
  hiredDate: {
    type: Date,
    required: [true, 'Hired date is required'],
    //default: Date.now,  // Automatically set to the current date
   // immutable: true,    // Makes the field unchangeable
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
