// ETaskModel.js
const mongoose = require('mongoose');

const ETaskSchema = new mongoose.Schema({
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  emp_name: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  assign_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  task_des: {
    type: String,
    required: true,
  },
  task_status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
});
module.exports = mongoose.model('ETasks', ETaskSchema);
