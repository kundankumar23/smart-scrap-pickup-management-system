const mongoose = require("mongoose");

const pickupRequestSchema =
  new mongoose.Schema(
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

      city: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        default: "",
      },

      assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: null,
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Assigned",
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