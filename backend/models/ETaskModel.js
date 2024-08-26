// ETaskModel.js
const mongoose = require('mongoose');

const ETaskSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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
        enum: ['pending', 'inprogress', 'completed', 'onhold', 'cancelled'],
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ETask', ETaskSchema);
