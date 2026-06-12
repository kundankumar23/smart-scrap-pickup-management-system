const PickupRequest = require("../models/PickupRequest");

const createPickupRequest = async (req, res) => {
  try {
    const {
      scrapType,
      estimatedWeight,
      pickupAddress,
    } = req.body;

    const pickup = await PickupRequest.create({
      user: req.user.id,
      scrapType,
      estimatedWeight,
      pickupAddress,
    });

    res.status(201).json({
      success: true,
      message: "Pickup request created",
      pickup,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pickups.length,
      pickups,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createPickupRequest,
  getMyPickups,
};