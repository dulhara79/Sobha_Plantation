// ETaskController.js
const ETaskModel = require('../../models/Employee/ETaskModel');
const Employee = require('../../models/Employee/Employee');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { emp_id, task, assign_date, due_date, task_des, task_status } = req.body;
    
        // Fetch employee full name
        const employee = await Employee.findById(emp_id);
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        const emp_name = `${employee.firstName} ${employee.lastName}`;
    
        const newETask = new ETaskModel({
          emp_id,
          emp_name,
          task,
          assign_date,
          due_date,
          task_des,
          task_status,
        });
    
        await newETask.save();
        res.status(201).json({ message: 'Task record created successfully', task: newETask });
      } catch (error) {
        console.error('Error creating task record:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        // const tasks = await ETask.find().populate('emp_id', 'name');
        // res.status(200).json({success:true , tasks});
        const tasks = await ETaskModel.find({});
        res.status(200).json({
            success: true,
            data: tasks,
          });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({succcess:false, message: 'Error fetching tasks', error });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await ETask.findById(req.params.id).populate('emp_id', 'name');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { emp_id } = req.body;
        
        // Fetch employee full name
        const employee = await Employee.findById(emp_id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const emp_name = `${employee.firstName} ${employee.lastName}`;

        const updatedTask = await ETaskModel.findByIdAndUpdate(req.params.id, { ...req.body, emp_name }, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await ETaskModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
