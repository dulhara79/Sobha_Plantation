// ETaskController.js
const ETask = require('../models/ETaskModel');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const newTask = new ETask(req.body);
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await ETask.find().populate('emp_id', 'name');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error });
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
        const updatedTask = await ETask.findByIdAndUpdate(req.params.id, req.body, {
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
        const deletedTask = await ETask.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
