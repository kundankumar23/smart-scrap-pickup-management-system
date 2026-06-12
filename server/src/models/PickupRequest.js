const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scrapType: {
      type: String,
      required: true,
    },

    estimatedWeight: {
      type: Number,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "On The Way",
        "Completed",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PickupRequest",
  pickupRequestSchema
);