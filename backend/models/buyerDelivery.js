const mongoose = require("mongoose");

const BuyerDeliverySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: "None",
    },
    address: {
      type: String,
      required: true,
      default: "None",
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    phone: {
        type: Number,
        required: true,
      },
    deliveryId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
        sparse: true
        }
    });

module.exports = mongoose.model("BuyerDeliveryRecords", BuyerDeliverySchema);