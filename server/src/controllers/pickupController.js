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

module.exports = {
  createPickupRequest,
};