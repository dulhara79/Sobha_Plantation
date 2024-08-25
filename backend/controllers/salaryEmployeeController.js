const SalaryEmployee = require('../models/SalaryEmployee');

// Create a new employee salary
exports.createEmployeeSalary = async (req, res) => {
  try {
    const newSalaryEmployee = new SalaryEmployee(req.body);
    await newSalaryEmployee.save();
    res.status(201).json(newSalaryEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all employee salaries
exports.getAllEmployeeSalaries = async (req, res) => {
  try {
    const salaries = await SalaryEmployee.find();
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee salary by ID
exports.getEmployeeSalaryById = async (req, res) => {
  try {
    const salary = await SalaryEmployee.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: 'Employee salary not found' });
    }
    res.json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee salary
exports.updateEmployeeSalary = async (req, res) => {
  try {
    const salary = await SalaryEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!salary) {
      return res.status(404).json({ message: 'Employee salary not found' });
    }
    res.json(salary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete employee salary
exports.deleteEmployeeSalary = async (req, res) => {
  try {
    const salary = await SalaryEmployee.findByIdAndDelete(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: 'Employee salary not found' });
    }
    res.json({ message: 'Employee salary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
