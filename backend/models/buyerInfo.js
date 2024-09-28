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
    userName: {
      type: String,
      required: true,
      default: "None",
    },
    Password: {
      type: String,
      required: true,
      default: "None",
    },
    ConfirmPassword: {
      type: String,
      required: true,
      default: "None",
    },
    Gender: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date, // Changed to Date type for better handling
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
  },
);

module.exports = mongoose.model("BuyerInfoRecords", BuyerInfoSchema);
