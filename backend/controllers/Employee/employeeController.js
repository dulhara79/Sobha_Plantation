const Employee = require('../../models/Employee/Employee');

// Helper function for validating input data
const validateInput = (data) => {
  const errors = {};

  if (!data.firstName || !/^[a-zA-Z]+$/.test(data.firstName)) {
    errors.firstName = 'First name can only contain letters and is required.';
  }

  if (!data.lastName || !/^[a-zA-Z]+$/.test(data.lastName)) {
    errors.lastName = 'Last name can only contain letters and is required.';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  }

  if (!data.gender || !['male', 'female', 'other'].includes(data.gender)) {
    errors.gender = 'Gender is required and must be one of male, female, or other.';
  }

  if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
    errors.contactNumber = 'Contact number must be 10 digits and is required.';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required.';
  }

  if (!data.nic || !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(data.nic)) {
    errors.nic = 'NIC must be in old (9 digits and V/X) or new format (12 digits) and is required.';
  }

  if (!data.address) {
    errors.address = 'Address is required.';
  }

  if (!data.employeeType) {
    errors.employeeType = 'Employee type is required.';
  }

  if (!data.hiredDate) {
    errors.hiredDate = 'Hired date is required.';
  }

  if (data.hourlyRate === undefined || data.hourlyRate <= 0) {
    errors.hourlyRate = 'Hourly rate must be a positive number.';
  }

  return errors;
};


// Create a new employee
exports.createEmployee = async (req, res) => {
  console.log("inside controller createEmployee");
  
  const errors = validateInput(req.body);
  console.log("Validation errors:", errors);
  console.log("Object.keys:", Object.keys);
  
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const employee = new Employee(req.body);
    console.log("Employee data:", req.body);
    await employee.save();
    res.status(201).json({ status: true, employee });
    console.log("Employee saved successfully.");
  } catch (error) {
    console.error("Error saving employee:", error.message);
    res.status(400).json({ status: false, error: error.message });
  }
};


// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log("Employees:", employees);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const errors = validateInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
