const mongoose = require("mongoose");

const SeedlingSchema = new mongoose.Schema({
  seedlingType: {
    type: String,
    required: true,
    unique: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
  },
  minStock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock"],
    default: function () {
      return this.currentQuantity > this.minStock ? "In Stock" : "Low Stock";
    },
  },
});

module.exports = mongoose.model("Seedling", SeedlingSchema);
