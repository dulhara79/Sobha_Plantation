const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Employee"],
        default: "Employee",
    },
});

module.exports = mongoose.model("Employee", EmployeeSchema);