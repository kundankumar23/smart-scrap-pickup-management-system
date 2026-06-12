const PickupRequest = require("../models/PickupRequest");
const Agent = require("../models/Agent");

// Create Pickup Request
const createPickupRequest = async (req, res) => {
  try {
    const {
      scrapType,
      estimatedWeight,
      pickupAddress,
      city,
    } = req.body;

    // Find available agent in same city
    const assignedAgent = await Agent.findOne({
      city: city,
      isAvailable: true,
    });

    const pickup = await PickupRequest.create({
      user: req.user.id,

      scrapType,
      estimatedWeight,
      pickupAddress,
      city,

      assignedAgent: assignedAgent
        ? assignedAgent._id
        : null,
    });

    res.status(201).json({
      success: true,
      message: "Pickup request created",

      assignedAgent: assignedAgent
        ? assignedAgent.name
        : "No Agent Available",

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

// Get Logged-in User Pickups
const getMyPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find({
      user: req.user.id,
    })
      .populate(
        "assignedAgent",
        "name email phone city"
      )
      .sort({ createdAt: -1 });

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

// Agent: Get Assigned Pickups
const getAssignedPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find({
      assignedAgent: req.user.id,
    })
      .populate(
        "user",
        "name email phone"
      )
      .sort({ createdAt: -1 });

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

// Agent: Update Pickup Status
const updatePickupStatus = async (req, res) => {
  try {
    const { pickupId } = req.params;
    const { status } = req.body;

    const pickup =
      await PickupRequest.findById(
        pickupId
      );

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: "Pickup not found",
      });
    }

    if (
      pickup.assignedAgent &&
      pickup.assignedAgent.toString() !==
        req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    pickup.status = status;

    await pickup.save();

    res.status(200).json({
      success: true,
      message:
        "Pickup status updated successfully",
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
  getMyPickups,
  getAssignedPickups,
  updatePickupStatus,
};