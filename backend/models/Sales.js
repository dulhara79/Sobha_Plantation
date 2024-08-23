const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    productType: {
        type: String,
        required: true,
    },
    salesDate: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Sales", SalesSchema);
