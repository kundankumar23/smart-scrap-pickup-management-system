const PickupRequest = require("../models/PickupRequest");
const Agent = require("../models/Agent");

// Calculate distance between pickup and agent
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dx = lat1 - lat2;
  const dy = lon1 - lon2;

  return Math.sqrt(dx * dx + dy * dy);
};

// Create Pickup Request
const createPickupRequest = async (req, res) => {
  try {
    const {
      scrapType,
      estimatedWeight,
      pickupAddress,
      latitude,
      longitude,
    } = req.body;

    // Find all available agents
    const agents = await Agent.find({
      isAvailable: true,
    });

    let nearestAgent = null;
    let minDistance = Infinity;

    // Find nearest agent
    for (const agent of agents) {
      const distance = calculateDistance(
        latitude,
        longitude,
        agent.location.latitude,
        agent.location.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestAgent = agent;
      }
    }

    // Create pickup request
    const pickup = await PickupRequest.create({
      user: req.user.id,

      scrapType,
      estimatedWeight,
      pickupAddress,

      pickupLocation: {
        latitude,
        longitude,
      },

      assignedAgent: nearestAgent
        ? nearestAgent._id
        : null,
    });

    res.status(201).json({
      success: true,
      message: "Pickup request created",

      assignedAgent: nearestAgent
        ? nearestAgent.name
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

const getAssignedPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find({
      assignedAgent: req.user.id,
    })
      .populate("user", "name email phone")
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

module.exports = {
  createPickupRequest,
  getMyPickups,
  getAssignedPickups,
};