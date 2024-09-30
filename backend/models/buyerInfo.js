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
    password: {
        type: String,
        required: true,
        default: "None",
      },
    confirmPassword: {
      type: String,
      required: true,
      default: "None",
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
    InfoId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
        sparse: true
        }
    });

module.exports = mongoose.model("BuyerInfoRecords", BuyerInfoSchema);