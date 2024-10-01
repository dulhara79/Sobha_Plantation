const mongoose = require("mongoose");

const BuyerInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date, 
      required: true,
    },
    Number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    InfoId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("BuyerInfoRecords", BuyerInfoSchema);
